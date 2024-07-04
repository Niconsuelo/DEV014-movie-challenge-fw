import { render, screen, fireEvent } from '@testing-library/react';
import SelectComponent from '../components/ListOptions';
import GenresOptions from '../models/GenresOptions';

describe('SelectComponent', () => {
  const options: GenresOptions[] = [
    { value: 'rock', label: 'Rock' },
    { value: 'jazz', label: 'Jazz' },
    { value: 'pop', label: 'Pop' },
  ];

  const onChangeOption = jest.fn();

  test('test_render_correct_number_of_options', () => {
    render(<SelectComponent options={options} selected={null} onChangeOption={onChangeOption} name="Select Genre" />);
    const renderedOptions = screen.getAllByRole('option');
    // Including the disabled option
    expect(renderedOptions).toHaveLength(options.length + 1);
  });

  test('test_display_correct_selected_value', () => {
    const selectedOption = { value: 'jazz', label: 'Jazz' };
    render(<SelectComponent options={options} selected={selectedOption} onChangeOption={onChangeOption} name="Select Genre" />);
    const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
    expect(selectElement.value).toBe(selectedOption.value);
  });

  test('test_handle_on_change_option_event', () => {
    render(<SelectComponent options={options} selected={null} onChangeOption={onChangeOption} name="Select Genre" />);
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'pop' } });
    expect(onChangeOption).toHaveBeenCalled();
  });
});