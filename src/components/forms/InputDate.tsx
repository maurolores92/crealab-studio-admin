import { Controller } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Props } from 'react-apexcharts'
import { DateTime } from 'luxon'
import CustomTextField from 'src/@core/components/mui/text-field'

const InputDate = ({
  validate = { requied: true },
  name,
  label,
  minDate,
  control,
  errors,
  size = 'small',
  sx = { mb: 4 },
  showTimeSelect = false,
  timeFormat = 'HH:mm',
  timeIntervals = 15,
  timeCaption = 'Time',
  dateFormat = 'yyyy-MM-dd'
}: Props) => {

  return (
    <Controller
      name={name}
      control={control}
      rules={validate}
      render={({ field: { value, onChange } }) => {
        const isValid = DateTime?.fromJSDate(new Date(value))?.isValid; 
        
        return (
        <DatePickerWrapper>
          <DatePicker
            {...(minDate && minDate)}
            locale={'es'}
            onChange={date => onChange(date)}
            selected={value && isValid ? new Date(value) : new Date()}
            showTimeSelect={showTimeSelect}
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            dateFormat={dateFormat}
            popperPlacement={'bottom-start'}
            customInput={<CustomTextField sx={sx} label={label} size={size} fullWidth error={Boolean(errors.date)} />}
          />
        </DatePickerWrapper>
      )}}
    />
  )
}

export default InputDate
