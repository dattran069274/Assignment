class Api::V1::PropertyManagement::PropertiesController < Api::V1::BaseController
  def index
    authorize Property
    pagy, properties = paginate(Property.order(created_at: :desc))
    render_resource_collection(properties.includes(:group_property), pagy: pagy)
  end

  def show
    authorize Property
    render_resource(property)
  end

  def create
    authorize Property
    property = Property.new(property_params)
    property.status = :available
    property.save ? render_resource(property, status: :created) : render_resource_errors(property.errors)
  end

  def update
    authorize Property
    property.update(property_params) ? render_resource(property) : render_resource_errors(property.errors)
  end

  def destroy
    authorize Property
    property.destroy!
    head :no_content
  end

  def response_property_request
    authorize Property
    begin
      ActiveRecord::Base.transaction do
        if property.available_status?
          PropertyProvidingHistory.create!(
            provider_id: current_user.id,
            receiver_id: params[:receiver_id],
            property_id: params[:id],
            status: :provided
          )
          property.update!(status: :used)
        else
          providing_history = PropertyProvidingHistory.find_by(property_id: property.id, status: :provided)
          providing_history.update!(status: :recall)
          property.update!(status: :available)
        end
        render_resource(property, status: :ok)
      end
    rescue StandardError => e
      render_resource_errors(detail: e)
    end
  end

  private

  def property
    @property ||= Property.find(params[:id])
  end

  def property_params
    params.require(:property).permit(
      :code_seri,
      :name,
      :brand,
      :group_property_id,
      :price,
      :date_buy,
      :number_of_repairs,
      :status
    )
  end
end
