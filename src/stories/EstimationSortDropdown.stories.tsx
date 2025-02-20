import EstimationSortDropdown from '@/components/dropdown/EstimationSortDropdown';

export default {
  title: 'Components/Dropdown/EstimationSortDropdown',
  component: EstimationSortDropdown,
};

const Template = () => <EstimationSortDropdown onChange={change => console.log(change)} />;

export const Default = Template.bind({});
