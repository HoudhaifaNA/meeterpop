import { useFormContext } from 'react-hook-form';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { generatePopupItem, togglePopupByIndex } from '@/lib/utils';
import useGroupedParams from '@/hooks/useGroupedParams';
import { usePopupManager } from '@/store';
import { PopupFormValues, PopupItem } from '@/types';

interface PopupAdderProps extends Pick<PopupItem, 'id'> {}

const PopupAdder = ({ id }: PopupAdderProps) => {
  const form = useFormContext<PopupFormValues>();
  const { insertPopup } = usePopupManager();
  const { isDomain, value } = useGroupedParams();

  const popups = form.watch('popups');

  const addPopup = () => {
    if (isDomain && value) {
      const prevPopups = togglePopupByIndex(popups, id, false);
      const newPopup = generatePopupItem(value);
      insertPopup('toCreate', newPopup.id);
      form.setValue('popups', [...prevPopups, newPopup]);
    }
  };

  return (
    <>
      {isDomain && (
        <Button variant='outline' type='button' className='max-w-max' onClick={addPopup}>
          <Plus className='mr-2 h-4 w-4' />
          Add another one
        </Button>
      )}
    </>
  );
};

export default PopupAdder;
