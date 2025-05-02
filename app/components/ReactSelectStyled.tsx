import clsx from 'clsx';
import React, { ComponentType } from 'react';
import Select, { components, GroupBase, IndicatorsContainerProps, OptionProps } from 'react-select';

const controlStyles = {
  base: 'bg-gray50 border rounded-md hover:cursor-pointer py-3 tw-txt-md-500 bg-[#F4F4F5]',
  focus: 'border border-2 border-main500',
  nonFocus: 'border-0 hover:border-gray-400 ',
};

const placeholderStyles = 'text-gray400 pl-1 ';
const selectInputStyles = 'pl-1';
const valueContainerStyles = 'p-1 pl-3 gap-1 text-[14px] ';
const singleValueStyles = 'leading-7 ml-1';
const multiValueStyles = 'bg-gray-100 rounded items-center  pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 ';
const multiValueRemoveStyles = 'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md';
const indicatorsContainerStyles = 'p-1 gap-1';
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = 'bg-gray-300 hidden';
const dropdownIndicatorStyles = 'p-1 hover:bg-gray-100 text-gray400 rounded-md hover:text-black';
const menuStyles = 'p-1 mt-2 border border-[#999999] bg-white rounded-lg text-[14px] px-2 py-2';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-3 rounded tw-txt-md-500',
  focus: 'bg-[#e7efff] active:bg-[#e7efff] text-main500 tw-txt-md-500',
  selected: 'text-gray900',
};
const noOptionsMessageStyles = 'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

const DefaultOption = (props: OptionProps<{ value: number; label: string }>) => {
  return <components.Option {...props} />;
};

const DefaultIndicatorsContainer: ComponentType<IndicatorsContainerProps<unknown, boolean, GroupBase<unknown>>> = props => {
  return <components.IndicatorsContainer {...props} className="asdf" />;
};

export const ReactSelect = (props: React.ComponentPropsWithoutRef<typeof Select> & { customOptions?: 'REGISTER_PATIENTS' }) => (
  <Select
    // 아래의 instanceId 삭제시 hydration error 발생하므로 제거하지 말것
    instanceId="react-select-3-live-region"
    closeMenuOnSelect={true}
    hideSelectedOptions={false}
    unstyled
    styles={{
      input: base => ({
        ...base,
        'input:focus': {
          boxShadow: 'none',
        },
      }),
      // On mobile, the label will truncate automatically, so we want to
      // override that behaviour.
      multiValueLabel: base => ({
        ...base,
        whiteSpace: 'normal',
        overflow: 'visible',
      }),
      control: base => ({
        ...base,
        transition: 'none',
      }),
    }}
    // components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
    classNames={{
      control: ({ isFocused }) => clsx(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
      placeholder: () => placeholderStyles,
      input: () => selectInputStyles,
      valueContainer: () => valueContainerStyles,
      singleValue: () => singleValueStyles,
      multiValue: () => multiValueStyles,
      multiValueLabel: () => multiValueLabelStyles,
      multiValueRemove: () => multiValueRemoveStyles,
      indicatorsContainer: () => indicatorsContainerStyles,
      clearIndicator: () => clearIndicatorStyles,
      indicatorSeparator: () => indicatorSeparatorStyles,
      dropdownIndicator: () => dropdownIndicatorStyles,
      menu: () => menuStyles,
      groupHeading: () => groupHeadingStyles,
      option: ({ isFocused, isSelected }) => clsx(isFocused && optionStyles.focus, isSelected && optionStyles.selected, optionStyles.base),
      noOptionsMessage: () => noOptionsMessageStyles,
    }}
    {...props}
    components={{
      IndicatorsContainer: DefaultIndicatorsContainer,
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      Option: DefaultOption,
    }}
  />
);
