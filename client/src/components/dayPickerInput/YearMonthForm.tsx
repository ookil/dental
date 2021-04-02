const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear - 100, 0);
const toMonth = new Date(currentYear, 11);

type FormProps = {
  date: Date;
  localeUtils: any;
  onChange: (newDate: Date) => void;
};

const YearMonthForm = ({ date, localeUtils, onChange }: FormProps) => {
  const months: string[] = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i++) {
    years.push(i);
  }

  const handleChange = (e: any) => {
    const { selectMonth, selectYear } = e.target.form;

    onChange(new Date(selectYear.value, selectMonth.value));
  };

  return (
    <div className='DayPicker-Caption'>
      <select
        name='selectMonth'
        onChange={handleChange}
        value={date.getMonth()}
      >
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select
        name='selectYear'
        onChange={handleChange}
        value={date.getFullYear()}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default YearMonthForm;
