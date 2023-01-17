class Api::V1::RequestManagement::RequestPropertiesController < Api::V1::BaseController
  def index
    authorize RequestProperty
    pagy, request_properties = paginate(RequestProperty.order(created_at: :desc))
    render_resource_collection(request_properties.includes(:requester, :approver), pagy: pagy)
  end

  def show
    authorize request_property
    render_resource(request_property)
  end

  def create
    request_property = RequestProperty.new(request_property_params)
    request_property.requester_id = current_user.id
    request_property.save ? render_resource(request_property, status: :created) : render_resource_errors(request_property.errors)
  end

  def update
    authorize request_property
    request_property.update(request_property_params) ? render_resource(request_property) : render_resource_errors(request_property.errors)
  end

  def destroy
    authorize request_property
    request_property.destroy!
    head :no_content
  end

  def response_request
    authorize RequestProperty
    status = params[:response_type] == "cancelled" ? :cancelled : :approved
    request_property.update(status: status, approver_id: current_user.id) ? render_resource(request_property) : render_resource_errors(request_property.errors)
  end

  def requests_by_user
    request_properties = RequestProperty.where(requester_id: params[:staff_id]).order(created_at: :desc)
    render_resource_collection(request_properties)
  end

  def requests_by_status
    authorize RequestProperty
    request_properties = RequestProperty.where(status: params[:status]).order(created_at: :desc)
    render_resource_collection(request_properties.includes(:requester, :approver))
  end

  private

  def request_property
    @request_property ||= RequestProperty.find(params[:id])
  end

  def request_property_params
    params.require(:request_property).permit(:request_type, :status, :description, :reason, :group_property_id)
  end
end
