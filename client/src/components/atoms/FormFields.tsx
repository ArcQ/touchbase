import React from 'react';
import styled from 'styled-components';

import { CheckCircle, ErrorCircle, Spinner } from 'components/atoms/Icons';
import { getFormErrorMessage } from 'constants/Errors';

export const Label = styled.label.attrs({
  className: '',
})``;

const InputClasses = 'w-full mt-2 px-4 py-2 text-xl border-charcoal2 rounded-[10px] bg-transparent';

const Input = styled.input.attrs({
  className: InputClasses,
})``;

export const InputContainer = styled.div.attrs({
  className: InputClasses,
})``;

const TextArea = styled.textarea.attrs({
  className: 'w-full mt-2 px-4 py-2 text-xl border-charcoal2 rounded-[10px] bg-transparent',
})``;

// TODO replace hookformprops with form provider and user formcontext

const EyeIcon = () => (
  <svg
    className="absolute top-[21px] right-[16px]"
    width="23"
    height="19"
    viewBox="0 0 23 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.8438 8.83594C20.7344 4.03125 16.5156 0.75 11.75 0.75C6.94531 0.75 2.72656 4.03125 0.617188 8.83594C0.539062 9.03125 0.5 9.30469 0.5 9.5C0.5 9.69531 0.539062 10.0078 0.617188 10.2031C2.72656 15.0078 6.94531 18.25 11.75 18.25C16.5156 18.25 20.7344 15.0078 22.8438 10.2031C22.9219 10.0078 23 9.69531 23 9.5C23 9.30469 22.9219 9.03125 22.8438 8.83594ZM17.375 9.5C17.375 12.625 14.8359 15.125 11.75 15.125C8.625 15.125 6.125 12.625 6.125 9.5C6.125 6.41406 8.625 3.875 11.75 3.875C14.8359 3.875 17.375 6.41406 17.375 9.5ZM11.75 5.75C11.6328 5.75 11.5156 5.78906 11.3984 5.78906C11.5938 6.14062 11.75 6.57031 11.75 7C11.75 8.40625 10.6172 9.5 9.25 9.5C8.78125 9.5 8.35156 9.38281 8 9.1875C8 9.30469 8 9.42188 8 9.5C8 11.5703 9.67969 13.25 11.75 13.25C13.8203 13.25 15.5 11.6094 15.5 9.53906C15.5 7.46875 13.7812 5.75 11.75 5.75Z"
      fill="#28D08D"
    />
  </svg>
);

const AsyncCheckState = ({ asyncCheck }) => {
  let state;
  if (asyncCheck.isLoading) {
    state = 'isLoading';
  } else {
    state = asyncCheck.result ? 'success' : 'error';
  }
  return (
    <>
      {state === 'isLoading' && <Spinner className="w-5 h-5 absolute top-[21px] right-[15px]" />}
      {state === 'success' && (
        <CheckCircle className="w-5 h-5 text-green absolute top-[21px] right-[15px]" />
      )}
      {state === 'error' && (
        <ErrorCircle className="w-5 h-5 text-red absolute top-[21px] right-[15px]" />
      )}
    </>
  );
};

export const FormField = props => {
  const {
    input,
    containerClassName,
    label,
    labelFor,
    type,
    errors,
    name,
    placeholder,
    restProps,
    showPassword,
    showPasswordBtn,
    showAsyncCheck,
    asyncCheck,
  } = props;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="mt-6">
        <Label className="text-xl text-charcoal4" htmlFor={labelFor && labelFor}>
          {label}
        </Label>
        <div className="relative">
          <Input
            type={type}
            showPasswordBtn={showPasswordBtn}
            name={name}
            placeholder={placeholder}
            {...input}
            {...restProps}
          />
          {showPasswordBtn && (
            <button type="button" onClick={showPassword}>
              <EyeIcon />
            </button>
          )}
          {showAsyncCheck && <AsyncCheckState asyncCheck={asyncCheck} />}
        </div>
      </div>
      {errors[name] && <FormError error={errors[name]} />}
    </div>
  );
};

const Select = styled.select.attrs({
  className: 'w-full mt-2 px-4 py-2 text-xl border-charcoal2 rounded-[10px] bg-transparent',
})``;

export const DropDownOptionField = props => {
  const {
    input,
    containerClassName,
    label,
    labelFor,
    errors,
    name,
    placeholder,
    restProps,
    options,
  } = props;

  return (
    <div className={`w-full ${containerClassName}`}>
      <div className="mt-6">
        <Label htmlFor={labelFor && labelFor}>{label}</Label>
        <div className="relative">
          <Select defaultValue="" {...input} {...restProps}>
            <option value="" disabled hidden>
              {placeholder}
            </option>
            {options.map(v => (
              <option key={v.value} value={v.value}>
                {v.displayStr}
              </option>
            ))}
          </Select>
        </div>
      </div>
      {errors[name] && <FormError error={errors[name]} />}
    </div>
  );
};

export const FormTextArea = props => {
  const { input, label, labelFor, type, errors, name, placeholder, restProps } = props;
  return (
    <div>
      <div className="mt-6">
        <Label htmlFor={labelFor && labelFor}>{label}</Label>
        <TextArea type={type} name={name} placeholder={placeholder} {...input} {...restProps} />
      </div>
      {errors[name] && <FormError error={errors[name]} />}
    </div>
  );
};

export const FormError = ({ error }) => (
  <p className="text-sm text-red">{getFormErrorMessage(error)}</p>
);
