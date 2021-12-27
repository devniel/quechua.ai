import React, { useEffect, useState } from 'react';
import Downshift from 'downshift';
import { Chip, TextField, Theme } from '@mui/material';

export default function TagsInput({ ...props }) {
  const { onChange, placeholder, value, ...other } = props;
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  useEffect(() => {
    if (JSON.stringify(selectedItem) != JSON.stringify(value)) {
      onChange(selectedItem);
    }
  }, [selectedItem, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const eventTarget = event.target as HTMLInputElement;
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        eventTarget.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!eventTarget.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(eventTarget.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue('');
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
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
                    selectedItem.length > 0
                      ? selectedItem.map((item) => (
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
