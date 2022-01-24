import React, { useEffect, useState } from 'react';
import Downshift from 'downshift';
import { Chip, TextField, TextFieldProps, Theme } from '@mui/material';

export default function TagsInput({
  ...props
}: TextFieldProps & {
  onChange?: (item) => void;
  placeholder?: string;
  value: string[];
}) {
  const { onChange, placeholder, value, ...other } = props;
  console.log('value =>', value);
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  useEffect(() => {
    if (JSON.stringify(selectedItem) != JSON.stringify(value)) {
      onChange?.(selectedItem);
    }
  }, [selectedItem, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === ',') event.preventDefault();
    if (event.key === 'Enter' || event.key === ',') {
      const eventTarget = event.target as HTMLInputElement;
      const newSelectedItem = [...selectedItem];
      const newValue = eventTarget.value.trim().replace(',', '');
      const duplicatedValues = newSelectedItem.indexOf(newValue);

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!newValue.replace(/\s/g, '').length) return;

      newSelectedItem.push(newValue);
      setSelectedItem(newSelectedItem);
      setInputValue('');
    }
    if (
      selectedItem?.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem?.slice(0, selectedItem.length - 1));
    }
  };

  const handleChange = (item) => {
    let newSelectedItem: string[] = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  };

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={handleChange}
        selectedItem={selectedItem}
      >
        {({ getInputProps }) => {
          const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
            onKeyDown: handleKeyDown,
            placeholder,
          });
          return (
            <div>
              <TextField
                variant="standard"
                inputProps={inputProps}
                InputProps={{
                  startAdornment:
                    selectedItem?.length > 0
                      ? selectedItem?.map((item) => (
                          <Chip
                            sx={{
                              margin: (theme: Theme) =>
                                theme.spacing(0.5, 0.25),
                            }}
                            key={item}
                            tabIndex={-1}
                            label={item}
                            onDelete={handleDelete(item)}
                          />
                        ))
                      : null,
                  onBlur,
                  onChange: (event) => {
                    handleInputChange(event);
                    onChange?.(event as any);
                  },
                  onFocus,
                }}
                {...other}
                autoFocus
                margin="dense"
                id="name"
                type="text"
                fullWidth
              />
            </div>
          );
        }}
      </Downshift>
    </>
  );
}
