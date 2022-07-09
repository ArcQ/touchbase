import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default ({ dropdownItems, dropdownBtn, onClick }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>{dropdownBtn}</DropdownMenu.Trigger>
    <DropdownMenu.Content className="absolute z-50 block px-6 py-3 mt-2 bg-charcoal0 origin-top-right rounded-3xl transition ease-in-out duration-200 transform whitespace-nowrap">
      {dropdownItems.map(item => (
        <DropdownMenu.Item
          className="py-2 cursor-pointer"
          key={item.value}
          onClick={() => onClick(item.value)}
        >
          {item.title}
        </DropdownMenu.Item>
      ))}
    </DropdownMenu.Content>
  </DropdownMenu.Root>
);
