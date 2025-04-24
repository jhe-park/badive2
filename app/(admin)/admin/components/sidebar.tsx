'use client';

import { Accordion, AccordionItem, cn, Listbox, ListboxItem, ListboxSection, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import React from 'react';

export enum SidebarItemType {
  Nest = 'nest',
}

interface EndContent {
  content?: React.ReactNode;
  className?: string;
}

interface SidebarItemBase {
  key: string;
  title: string;
  icon?: string;
  endContent?: React.ReactNode | EndContent;
  startContent?: React.ReactNode;
  href?: string;
  type?: SidebarItemType;
  [key: string]: any;
}

interface SidebarNestedItem extends SidebarItemBase {
  items?: SidebarItemBase[];
}

interface SidebarSection {
  key: string;
  title: string;
  items: SidebarItemBase[];
}

type SidebarItem = SidebarNestedItem | SidebarSection;

interface SectionClasses {
  base?: string;
  group?: string;
  heading?: string;
}

interface ItemClasses {
  base?: string;
  title?: string;
}

// ListboxProps의 기본 타입 가정 (실제 라이브러리에 따라 조정 필요)
type ListboxProps = Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> & {
  items?: any[];
  selectedKeys?: string[] | Set<string>;
  selectionMode?: 'single' | 'multiple';
  variant?: string;
  color?: string;
  hideSelectedIcon?: boolean;
  as?: React.ElementType;
  itemClasses?: ItemClasses & { [key: string]: string };
  classNames?: { list?: string; [key: string]: any };
  onSelectionChange?: (keys: Set<string>) => void;
  children?: (item: any) => React.ReactNode;
};

interface SidebarProps {
  items: SidebarItem[];
  isCompact?: boolean;
  defaultSelectedKey?: string;
  onSelect?: (key: string) => void;
  hideEndContent?: boolean;
  sectionClasses?: SectionClasses;
  itemClasses?: ItemClasses;
  iconClassName?: string;
  classNames?: {
    list?: string;
    [key: string]: any;
  };
  className?: string;
  // ListboxProps에서 onSelectionChange를 제외한 나머지 속성을 상속
  // ListboxProps 타입의 나머지 속성도 허용
  [key: string]: any;
}

const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      items,
      isCompact,
      defaultSelectedKey,
      onSelect,
      hideEndContent,
      sectionClasses: sectionClassesProp = {},
      itemClasses: itemClassesProp = {},
      iconClassName,
      classNames,
      className,
      ...props
    },
    ref,
  ) => {
    const [selected, setSelected] = React.useState(defaultSelectedKey);

    const sectionClasses = {
      ...sectionClassesProp,
      base: cn(sectionClassesProp?.base, 'w-full', {
        'p-0 max-w-[44px]': isCompact,
      }),
      group: cn(sectionClassesProp?.group, {
        'flex flex-col gap-1': isCompact,
      }),
      heading: cn(sectionClassesProp?.heading, {
        hidden: isCompact,
      }),
    };

    const itemClasses = {
      ...itemClassesProp,
      base: cn(itemClassesProp?.base, {
        'w-11 h-11 gap-0 p-0': isCompact,
      }),
    };

    const renderNestItem = React.useCallback(
      item => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          // Is a nest type item , so we need to remove the href
          delete item.href;
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            classNames={{
              base: cn(
                {
                  'h-auto p-0': !isCompact && isNestType,
                },
                {
                  'inline-block w-11': isCompact && isNestType,
                },
              ),
            }}
            endContent={isCompact || isNestType || hideEndContent ? null : (item.endContent ?? null)}
            startContent={
              isCompact || isNestType ? null : item.icon ? (
                <Icon className={cn('text-default-500 group-data-[selected=true]:text-foreground', iconClassName)} icon={item.icon} width={24} />
              ) : (
                (item.startContent ?? null)
              )
            }
            title={isCompact || isNestType ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon className={cn('text-default-500 group-data-[selected=true]:text-foreground', iconClassName)} icon={item.icon} width={24} />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}
            {!isCompact && isNestType ? (
              <Accordion className={'p-0'}>
                <AccordionItem
                  key={item.key}
                  aria-label={item.title}
                  classNames={{
                    heading: 'pr-3',
                    trigger: 'p-0',
                    content: 'py-0 pl-4',
                  }}
                  title={
                    item.icon ? (
                      <div className={'flex h-11 items-center gap-2 px-2 py-1.5'}>
                        <Icon className={cn('text-default-500 group-data-[selected=true]:text-foreground', iconClassName)} icon={item.icon} width={24} />

                        <span className="text-small font-medium text-default-500 group-data-[selected=true]:text-foreground">{item.title}</span>
                      </div>
                    ) : (
                      (item.startContent ?? null)
                    )
                  }
                >
                  {item.items && item.items?.length > 0 ? (
                    <Listbox
                      className={'mt-0.5'}
                      classNames={{
                        list: cn('border-l border-default-200 pl-4'),
                      }}
                      items={item.items}
                      variant="flat"
                    >
                      {item.items.map(renderItem)}
                    </Listbox>
                  ) : (
                    renderItem(item)
                  )}
                </AccordionItem>
              </Accordion>
            ) : null}
          </ListboxItem>
        );
      },
      // eslint-disable-next-line
      [isCompact, hideEndContent, iconClassName, items],
    );

    const renderItem = React.useCallback(
      item => {
        const isNestType = item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest;

        if (isNestType) {
          return renderNestItem(item);
        }

        return (
          <ListboxItem
            {...item}
            key={item.key}
            endContent={isCompact || hideEndContent ? null : (item.endContent ?? null)}
            startContent={
              isCompact ? null : item.icon ? (
                <Icon className={cn('text-default-500 group-data-[selected=true]:text-foreground', iconClassName)} icon={item.icon} width={24} />
              ) : (
                (item.startContent ?? null)
              )
            }
            textValue={item.title}
            title={isCompact ? null : item.title}
          >
            {isCompact ? (
              <Tooltip content={item.title} placement="right">
                <div className="flex w-full items-center justify-center">
                  {item.icon ? (
                    <Icon className={cn('text-default-500 group-data-[selected=true]:text-foreground', iconClassName)} icon={item.icon} width={24} />
                  ) : (
                    (item.startContent ?? null)
                  )}
                </div>
              </Tooltip>
            ) : null}
          </ListboxItem>
        );
      },
      // eslint-disable-next-line
      [isCompact, hideEndContent, iconClassName, itemClasses?.base],
    );

    return (
      <Listbox
        key={isCompact ? 'compact' : 'default'}
        ref={ref}
        hideSelectedIcon
        as="nav"
        className={cn('list-none', className)}
        classNames={{
          ...classNames,
          list: cn('items-center', classNames?.list),
        }}
        color="default"
        itemClasses={{
          ...itemClasses,
          base: cn('px-3 min-h-11 rounded-large h-[44px] data-[selected=true]:bg-default-100', itemClasses?.base),
          title: cn('text-small font-medium text-default-500 group-data-[selected=true]:text-foreground', itemClasses?.title),
        }}
        items={items}
        selectedKeys={[selected]}
        selectionMode="single"
        variant="flat"
        onSelectionChange={keys => {
          const key = Array.from(keys)[0];

          setSelected(key);
          onSelect?.(key);
        }}
        {...props}
      >
        {(item: any) => {
          return item.items && item.items?.length > 0 && item?.type === SidebarItemType.Nest ? (
            renderNestItem(item)
          ) : item.items && item.items?.length > 0 ? (
            <ListboxSection key={item.key} classNames={sectionClasses} showDivider={isCompact} title={item.title}>
              {item.items.map(renderItem)}
            </ListboxSection>
          ) : (
            renderItem(item)
          );
        }}
      </Listbox>
    );
  },
);

Sidebar.displayName = 'Sidebar';

export default Sidebar;
