import AppError from './AppError';
import { insertFile } from './filesManager';
import { isFile } from '@/types';

const managePopupsFormData = async (form: FormData, isInsertable: boolean) => {
  const popups: Record<string, any>[] = [];
  const formEntries = form.entries();

  for (let [key, value] of formEntries) {
    // Regex will convert the key from
    // 'popups[123][name]' to this ["popups[123][name]", "123", "name"]
    const match = key.match(/popups\[(\d+)]\[(.+)]/);
    let updatedValue: any = value;

    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!popups[index]) {
        popups[index] = {};
      }

      if (field === 'isDisabled') {
        // Convert it from string to boolean 'true' to true;
        updatedValue = value === 'true';
      } else if (field === 'icon' && isFile(value)) {
        const isValidImage = value.type.split('/')[0] === 'image';

        if (!isValidImage) {
          throw new AppError('Invalid image type', 403);
        }

        if (isInsertable) {
          updatedValue = await insertFile(value);
        }
      }
      popups[index][field] = updatedValue;
    }
  }

  return popups;
};

export default managePopupsFormData;
