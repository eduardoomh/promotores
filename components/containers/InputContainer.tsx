import React, { CSSProperties, useState } from 'react'
import { FormInstance } from 'antd'
import {
  Input,
  InputNumber,
  Radio,
  Button,
  Tooltip,
  Form,
  Checkbox,
  Select,
  TreeSelect
} from 'antd'
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons'

interface fetchedPostalCodeData {
  adminName1: string
  adminName2: string
  placeName: string
  postalcode: string
}

type inputContainerProps =
  | {
    type: 'text' | 'number' | 'email' | 'password' | 'checkbox'
    placeholder: string
    errorMessage?: string
    suffix?: string | React.ReactElement
    prefix?: string | React.ReactElement
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
    label?: string
    regexpPattern?: RegExp
    counters?: { min?: number; max?: number }
  }
  | {
    type: 'select'
    placeholder: string
    optionsList: Array<any>
    canSearch?: boolean
    onSearch?: (value: string) => void
    errorMessage?: string
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
    filter?: any
    sort?: any
  }
  | {
    type: 'multipleSelect'
    placeholder: string
    optionsList: Array<any>
    canSearch?: boolean
    onSearch?: (value: string) => void
    errorMessage?: string
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
  }
  | {
    type: 'searchSelect'
    placeholder: string
    optionsList: Array<any>
    canSearch?: boolean
    onSearch?: (value: string) => void
    errorMessage?: string
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
    filter?: any
    sort?: any
  }
  | {
    type: 'multipleRadio'
    optionsList: Array<string>
    errorMessage?: string
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
  }
  | {
    type:
    | 'allCountriesPostalCodeInputs'
    | 'allCountries'
    | 'countriesPostalCodesInputs'
    | 'countriesState'
    errorMessage?: string
    userFormHook?: FormInstance
    valueContainerName: string
    showUserAddresses?: boolean
    style?: CSSProperties
    onClick?: (e: any) => void
    onCountryChange?: (e: any) => void
    onSearch?: (e: any) => void
    onPostalCodeChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
  }
  | {
    type: 'prePostTab'
    placeholder: string
    errorMessage?: string
    suffix?: string | React.ReactElement
    prefix?: string | React.ReactElement
    valueContainerName: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    required?: boolean
    disabled?: boolean
    addonBefore?: string | React.ReactElement
    addonAfter?: string | React.ReactElement
    selectOptions?: Array<any>
    uniquePlaceholder?: string
  }
  | {
    type: 'button' | 'submitButton'
    title: string
    style?: CSSProperties
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    isButtonLoading?: boolean
    disabled?: boolean
    danger?: boolean
    ghost?: boolean
  }
  | {
    type: 'iconTitleHoverButton'
    title: string
    style?: CSSProperties
    shape: 'circle' | 'round' | 'default'
    iconOrReactElement: React.ReactElement
    onClick?: (e: any) => void
    onChange?: (e: any) => void
    isButtonLoading?: boolean
  }

const InputContainer: React.FC<inputContainerProps> = (inputProps) => {
  const { Option } = Select
  const [fetchedPostalCodePlaces, setFetchedPostalCodePlaces] = useState<
    Array<fetchedPostalCodeData>
  >([])
  const { TreeNode } = TreeSelect


  const getComponent = () => {
    switch (inputProps.type) {
      case 'text':
      case 'email':
      case 'number':
      case 'password':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            hasFeedback={inputProps.type === 'number' ? false : true}
            rules={
              inputProps.type === 'number'
                ? [
                  {
                    required: inputProps.required,
                    type: 'number',
                    message: inputProps.errorMessage
                      ? inputProps.errorMessage
                      : 'Error Message'
                  },
                  {
                    pattern: inputProps.regexpPattern,
                    message: inputProps.errorMessage
                      ? inputProps.errorMessage
                      : 'Error Message',
                    validator: async (_, inputName) => {
                      if (
                        inputName &&
                        inputName.length <
                        (inputProps.counters?.min ? inputProps.counters?.min : 2)
                      ) {
                        return Promise.reject(
                          new Error('Los campos deben tener al menos 2 carácteres')
                        )
                      }
                    }
                  }
                ]
                : [
                  {
                    required: inputProps.required,
                    type:
                      inputProps.type === 'text' || inputProps.type === 'password'
                        ? 'string'
                        : inputProps.type,
                    message: inputProps.errorMessage
                      ? inputProps.errorMessage
                      : 'Error Message',
                  },
                  {
                    pattern: inputProps.regexpPattern,
                    message: inputProps.errorMessage
                      ? inputProps.errorMessage
                      : 'Error Message',
                    validator: async (_, inputName) => {
                      if (
                        inputName &&
                        inputName.length <
                        (inputProps.counters?.min ? inputProps.counters?.min : 2)
                      ) {
                        return Promise.reject(
                          new Error('Los campos deben tener al menos 2 carácteres')
                        )
                      }
                    }
                  }
                ]
            }
          >
            {inputProps.type === 'password' ? (
              <Input.Password
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                suffix={inputProps.suffix}
                prefix={inputProps.prefix}
                disabled={inputProps.disabled}
                placeholder={inputProps.placeholder}
                onClick={inputProps.onClick}
                onChange={inputProps.onChange}
                style={{
                  width: '100%',
                  margin: '10px 0px',
                  ...inputProps.style
                }}
              />
            ) : inputProps.type === 'number' ? (
              <InputNumber
                style={{
                  width: '100%',
                  margin: '10px 0px',
                  ...inputProps.style
                }}
                addonAfter={inputProps.suffix}
                prefix={inputProps.prefix}
                controls={inputProps.suffix ? false : true}
                disabled={inputProps.disabled}
                placeholder={inputProps.placeholder}
                onClick={inputProps.onClick}
                onChange={inputProps.onChange}
                maxLength={inputProps?.counters?.max || 25}
              />
            ) : (
              <Input
                suffix={inputProps.suffix}
                prefix={inputProps.prefix}
                disabled={inputProps.disabled}
                placeholder={inputProps.placeholder}
                onClick={inputProps.onClick}
                onChange={inputProps.onChange}
                showCount
                maxLength={inputProps?.counters?.max || 50}
                style={{
                  width: '100%',
                  margin: '10px 0px',
                  ...inputProps.style
                }}
              />
            )}
          </Form.Item>
        )
      case 'checkbox':
        return (
          <Form.Item name={inputProps.valueContainerName} valuePropName="checked" noStyle>
            <Checkbox
              style={{ margin: '20px 5px', fontWeight: 'bolder', ...inputProps.style }}
              onClick={inputProps.onClick}
              onChange={inputProps.onChange}
            >
              {inputProps.placeholder}
            </Checkbox>
          </Form.Item>
        )
      case 'multipleRadio':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            rules={[
              {
                required: inputProps.required,
                message: inputProps.errorMessage
                  ? inputProps.errorMessage
                  : 'Error Message',
              }
            ]}
            style={{
              height: '100%',
              width: '100%',
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <Radio.Group name="RadioGroup" onChange={inputProps.onChange}>
              {typeof inputProps.optionsList !== 'string'
                ? inputProps.optionsList.map((value, index) => {
                  return (
                    <Radio
                      key={index}
                      onClick={inputProps.onClick}
                      value={index}
                      style={{
                        fontWeight: 'bolder'
                      }}
                    >
                      {value}
                    </Radio>
                  )
                })
                : null}
            </Radio.Group>
          </Form.Item>
        )
      case 'button':
      case 'submitButton':
        return (
          <Button
            disabled={inputProps.disabled}
            onClick={inputProps.onClick}
            style={{ borderRadius: '10px', ...inputProps.style }}
            type={'primary'}
            block={true}
            danger={inputProps.danger}
            ghost={inputProps.ghost}
            htmlType={inputProps.type === 'submitButton' ? 'submit' : undefined}
            loading={inputProps.isButtonLoading}
          >
            {inputProps.title}
          </Button>
        )
      case 'iconTitleHoverButton':
        return (
          <Tooltip title={inputProps.title}>
            <Button
              type="default"
              shape={inputProps.shape}
              icon={inputProps.iconOrReactElement}
              size="large"
              style={inputProps.style}
              onClick={inputProps.onClick}
              loading={inputProps.isButtonLoading}
            />
          </Tooltip>
        )
      case 'select':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            rules={[
              {
                required: inputProps.required,
                message: inputProps.errorMessage
                  ? inputProps.errorMessage
                  : 'Error Message',
              }
            ]}
          >
            <Select
              showSearch={inputProps.canSearch}
              style={{
                width: '100%',
                margin: '10px 0px',
                fontWeight: 'bolder',
                ...inputProps.style
              }}
              placeholder={inputProps.placeholder}
              onChange={inputProps.onChange}
              disabled={inputProps.disabled}
            >
              {inputProps.optionsList !== undefined
                ? inputProps.optionsList.map((value, index) => {
                  if (value.label && value.value) {
                    return (
                      <Option key={index} value={value.value}>
                        {value.label}
                      </Option>
                    )
                  }
                  return (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  )
                })
                : null}
            </Select>
          </Form.Item>
        )
      case 'multipleSelect':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            rules={[
              {
                required: inputProps.required,
                message: inputProps.errorMessage
                  ? inputProps.errorMessage
                  : 'Error Message',
              }
            ]}
          >
            <Select
              mode='multiple'
              showSearch={inputProps.canSearch}
              onSearch={inputProps.onSearch}
              style={{
                width: '100%',
                margin: '10px 0px',
                fontWeight: 'bolder',
                ...inputProps.style
              }}
              placeholder={inputProps.placeholder}
              onChange={inputProps.onChange}
              disabled={inputProps.disabled}
            >
              {inputProps.optionsList !== undefined
                ? inputProps.optionsList.map((value, index) => {
                  if (value.label && value.value) {
                    return (
                      <Option key={index} value={value.value}>
                        {value.label}
                      </Option>
                    )
                  }
                  return (
                    <Option key={index} value={value}>
                      {value}
                    </Option>
                  )
                })
                : null}
            </Select>
          </Form.Item>
        )
      case 'searchSelect':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            rules={[
              {
                required: inputProps.required,
                message: inputProps.errorMessage
                  ? inputProps.errorMessage
                  : 'Error Message',
              }
            ]}
          >
            <Select
              showSearch={inputProps.canSearch}
              optionFilterProp="children"
              filterOption={inputProps.filter}
              filterSort={inputProps.sort}
              style={{
                width: '100%',
                margin: '10px 0px',
                fontWeight: 'bolder',
                ...inputProps.style
              }}
              placeholder={inputProps.placeholder}
              onChange={inputProps.onChange}
              disabled={inputProps.disabled}
              options={inputProps.optionsList}
            />

          </Form.Item>
        )

      case 'prePostTab':
        return (
          <Form.Item
            name={inputProps.valueContainerName}
            rules={[
              {
                required: inputProps.required,
                message: inputProps.errorMessage
                  ? inputProps.errorMessage
                  : 'Error Message',
              }
            ]}
          >
            <Input
              addonBefore={inputProps.addonBefore}
              addonAfter={inputProps.addonAfter}
              suffix={inputProps.suffix}
              prefix={inputProps.prefix}
              disabled={inputProps.disabled}
              placeholder={inputProps.placeholder}
              onClick={inputProps.onClick}
              onChange={inputProps.onChange}
              style={{
                width: '100%',
                margin: '10px 0px',
                ...inputProps.style
              }}
            />
          </Form.Item>
        )
      default:
        return null
    }
  }

  return <>{getComponent()}</>
}

export default InputContainer
