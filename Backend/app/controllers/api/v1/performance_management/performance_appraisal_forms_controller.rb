class Api::V1::PerformanceManagement::PerformanceAppraisalFormsController < Api::V1::BaseController
  def index
    authorize PerformanceAppraisalForm
    pagy, pa_forms = paginate(PerformanceAppraisalForm.order(created_at: :desc))
    render_resource_collection(pa_forms, pagy: pagy)
  end

  def show
    authorize PerformanceAppraisalForm
    render_resource(pa_form)
  end

  def create
    authorize PerformanceAppraisalForm

    pa_form = PerformanceAppraisalForm.new(
      status: :in_progress,
      active: false,
      staff_id: staff.id,
      boss_id: staff.staff_id,
      start_date: pa_form_params[:start_date],
      end_date: pa_form_params[:end_date],
    )
    pa_form.save ? render_resource(pa_form) : render_resource_errors(pa_form.errors)
  end

  def create_all_fa_forms_for_staff
    p'@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
    authorize PerformanceAppraisalForm
    CreateAllPerformanceAppraisalFormWorker.perform_async(pa_form_params.to_json)
    head :ok
  end

  def update
    authorize pa_form
    render_resource_errors(status: "error", detail: I18n.t('errors.E202')) unless pa_form.active

    if staff?(pa_form)
      render_resource_errors(status: "error", detail: I18n.t('errors.E203')) if pa_form.status.self_reviewed_status?

      pa_form.status = :self_reviewed if params[:submit]
      pa_form.update(staff_pa_form_params) ? render_resource(pa_form) : render_resource_errors(pa_form.errors)
    elsif reviewer?(pa_form)
      render_resource_errors(status: "error", detail: I18n.t('errors.E203')) unless pa_form.status.self_reviewed_status?

      pa_form.status = :reviewer_reviewed if params[:submit]
      pa_form.update(reviewer_pa_form_params) ? render_resource(pa_form) : render_resource_errors(pa_form.errors)
    end
  end

  def destroy
    authorize PerformanceAppraisalForm
    pa_form.destroy!
    head :no_content
  end

  def update_all_active_or_inactive
    authorize PerformanceAppraisalForm

    begin
      ActiveRecord::Base.transaction do
        PerformanceAppraisalForm.update_all(active: params[:active])
      end
      head :ok
    rescue StandardError => e
      render_resource_errors(status: "error", detail: e)
    end
  end

  def update_pa_form_activation_status
    authorize PerformanceAppraisalForm
    pa_form.update!(active: params[:active]) ? render_resource(pa_form) : render_resource_errors(pa_form.errors)
  end

  def pa_forms_by_current_user
    pagy, pa_forms = paginate(PerformanceAppraisalForm.where(staff_id: current_user.id).order(created_at: :desc))
    authorize pa_forms
    render_resource_collection(pa_forms, pagy: pagy)
  end

  def pa_forms_by_my_reviewe
    pagy, pa_forms = paginate(PerformanceAppraisalForm.where(boss_id: current_user.id).order(created_at: :desc))
    authorize pa_forms
    render_resource_collection(pa_forms, pagy: pagy)
  end

  def remind_by_staff
    authorize PerformanceAppraisalForm
    PerformanceAppraisalFormMailer.remind(pa_form).deliver_now
    head :ok
  end

  def remind_many_staff
    authorize PerformanceAppraisalForm
    RemindAllPerformanceAppraisalFormWorker.perform_async
    head :ok
  end

  private

  def pa_form
    @pa_form ||= PerformanceAppraisalForm.find(params[:id])
  end

  def pa_form_params
    params.require(:pa_form).permit(:start_date, :end_date)
  end
 
  def staff_pa_form_params
    params.require(:pa_form).permit(
      :goals_set_staff, :goals_with_company_staff, :challenging_staff,
      :least_enjoy_staff, :contribute_staff, :current_job_staff, :improvement_staff,
      :obstructing_staff, :feedback_staff, :description_staff
    )
  end

  def reviewer_pa_form_params
    params.require(:pa_form).permit(
      :goals_set_boss, :goals_with_company_boss, :challenging_boss,
      :least_enjoy_boss, :contribute_boss, :current_job_boss, :improvement_boss,
      :obstructing_boss, :feedback_boss, :description_boss
    )
  end

  def staff? pa_form
    pa_form.staff_id == current_user.id
  end

  def reviewer? pa_form
    pa_form.boss_id == current_user.id
  end
end

