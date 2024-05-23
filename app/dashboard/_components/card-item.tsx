import { MouseEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clipboard, EllipsisVertical, Pen, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DeleteDialog from './delete-dialog';
import DomainForm from './domain-form';
import { GroupedItem, isDomainGroupedItem } from '@/types';
import { copyScript } from '@/lib/utils';
import { useGroupBy } from '@/store';

interface CardItemProps {
  item: GroupedItem;
}

const CardItem = ({ item }: CardItemProps) => {
  const [isDialogOpen, toggleDialog] = useState(false);
  const [editIntent, toggleEditIntent] = useState(false);
  const { groupBy } = useGroupBy();

  const isDomainItem = isDomainGroupedItem(item);

  let icon = '/default-favicon.png';

  if (isDomainItem) {
    icon = `https://www.google.com/s2/favicons?domain=${item.name}&sz=128`;
  } else if (groupBy === 'status') {
    icon = `/${item.groupBy}.png`;
  }

  const renderMainInfo = () => {
    if (isDomainItem) {
      return (
        <>
          {editIntent ? (
            <DomainForm isEdit id={item._id} defaultValues={{ name: item.name }} toggleEditIntent={toggleEditIntent} />
          ) : (
            <>
              <Link href={`/dashboard/popups?type=${groupBy}&value=${item.name}`}>
                <h4 className='text-base font-semibold'>{item.name}</h4>
              </Link>

              <span className='text-sm font-light'> {item.count} popups</span>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <Link href={`/dashboard/popups?type=${groupBy}&value=${item.groupBy}`}>
            <h4 className='text-base font-semibold capitalize'>{item.groupBy}</h4>
          </Link>
          <span className='text-sm font-light'> {item.count} popups</span>
        </>
      );
    }
  };

  const onToggleDialog = (e: MouseEvent) => {
    e.preventDefault();
    toggleDialog((prevStatus) => !prevStatus);
  };

  const onToggleEditIntent = () => {
    toggleEditIntent((prevStatus) => !prevStatus);
  };

  return (
    <div className='col-span-1 flex h-36 gap-4 rounded bg-white p-4 shadow-md'>
      <div className='relative h-8 w-8'>
        <Image src={icon} fill alt='logo' />
      </div>
      <div className='flex flex-1 flex-col justify-between'>{renderMainInfo()}</div>
      {isDomainItem && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='icon'>
              <EllipsisVertical className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className='text-black/500' onClick={copyScript}>
              <Clipboard className='mr-2 h-4 w-4' />
              <span>Copy script</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='text-black/500' onClick={onToggleEditIntent}>
              <Pen className='mr-2 h-4 w-4' />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem className='text-red-500' onClick={onToggleDialog}>
              <Trash2 className='mr-2 h-4 w-4' />
              <span>Delete</span>
              <DeleteDialog isOpen={isDialogOpen} toggleDialog={toggleDialog} id={item._id} name={item.name} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default CardItem;
