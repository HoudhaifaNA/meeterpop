import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import Image from 'next/image';

import { POPUP_PLACES } from '@/constants';
import { FormLabel } from '@/components/ui/form';
import { PopupFormValues, PopupItem } from '@/types';

interface PopupPlaceSelectorProps extends Pick<PopupItem, 'id' | 'place'> {}

const PopupPlaceSelector = ({ id, place }: PopupPlaceSelectorProps) => {
  const form = useFormContext<PopupFormValues>();
  const popups = form.watch('popups');

  const renderPlacesTabs = () => {
    return POPUP_PLACES.map((pl) => {
      const isPlaceSelected = pl === place;

      const selectePlace = () => {
        const updatedPopups = popups.map((popup) => {
          if (popup.id === id) {
            popup.place = pl;
          }
          return popup;
        });

        form.setValue('popups', updatedPopups);
      };

      return (
        <div className='flex w-32 flex-col gap-4 sm:w-36' key={pl} onClick={selectePlace}>
          <div
            className={clsx(
              'relative h-24 overflow-hidden rounded  border-4',
              isPlaceSelected ? 'border-cyan-400' : 'border-black/20'
            )}
          >
            <Image src={`/${pl}.png`} fill alt={pl} />
          </div>
          <span className='text-xs font-semibold capitalize'>{pl.replace('_', ' ')}</span>
        </div>
      );
    });
  };

  return (
    <div className='space-y-2'>
      <FormLabel>Place :</FormLabel>
      <div className='flex flex-wrap justify-between gap-4'>{renderPlacesTabs()}</div>
    </div>
  );
};

export default PopupPlaceSelector;
