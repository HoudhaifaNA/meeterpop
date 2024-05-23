import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { ChevronDown, Eye, EyeOff, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { usePopupManager } from '@/store';
import { PopupFormValues } from '@/types';

interface PopupItemActionsProps {
  popupNumber: number;
}

const PopupItemActions = ({ popupNumber }: PopupItemActionsProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch('popups');
  const currentPopup = popups[popupNumber - 1];
  const { insertPopup } = usePopupManager();

  const togglePopupVisibility = () => {
    const modifiedPopups = popups.map((popup) => {
      if (popup.id === currentPopup.id) {
        popup.isDisabled = !popup.isDisabled;
      }
      return popup;
    });
    form.setValue('popups', modifiedPopups);
  };

  const deletePopup = () => {
    if (popups.length > 1) {
      const filteredPopups = popups.filter((popup) => popup.id !== currentPopup.id);
      form.setValue('popups', filteredPopups);
      insertPopup('toDelete', currentPopup.id);
    }
  };

  return (
    <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
      <div className='flex flex-col gap-2 whitespace-nowrap sm:flex-row sm:items-center md:gap-4'>
        <h2 className='text-lg font-medium'>Notification {popupNumber} : </h2>
        <span className='text-sm'>( {currentPopup.domain} )</span>
      </div>
      <div className='ml-auto flex items-center gap-4 sm:ml-0'>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <CollapsibleTrigger asChild>
                <Button type='button' variant='outline' size='icon'>
                  <ChevronDown className={clsx('h-4 w-4', currentPopup.isOpen && 'rotate-180')} />
                </Button>
              </CollapsibleTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Expand</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type='button' variant='outline' size='icon' onClick={togglePopupVisibility}>
                {currentPopup.isDisabled ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{currentPopup.isDisabled ? 'Enable' : 'Disable'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type='button' variant='destructive' size='icon' onClick={deletePopup}>
                <Trash2 className='h-4 w-4 text-white' />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default PopupItemActions;
