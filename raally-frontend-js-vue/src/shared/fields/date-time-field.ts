import * as yup from 'yup';
import moment from 'moment';
import GenericField from '@/shared/fields/generic-field';
import { i18n } from '@/i18n';

export default class DateTimeField extends GenericField {
  required: boolean;
  placeholder: string;
  hint: string;

  constructor(
    name,
    label,
    config: {
      placeholder?;
      hint?;
      required?;
    } = {},
  ) {
    super(name, label);

    this.required = config.required;
    this.placeholder = config.placeholder;
    this.hint = config.hint;
  }

  forPresenter(value) {
    return value
      ? moment(value).format('YYYY-MM-DD HH:mm')
      : null;
  }

  forFilterPreview(value) {
    return value
      ? moment(value).format('YYYY-MM-DD HH:mm')
      : null;
  }

  forImportViewTable(value) {
    return value
      ? moment(value).format('YYYY-MM-DD HH:mm')
      : null;
  }

  forFormInitialValue(value) {
    return value ? moment(value) : null;
  }

  forFormRules() {
    const output: Array<any> = [];

    if (this.required) {
      output.push({
        required: true,
        message: i18n('validation.mixed.required').replace(
          '${path}',
          this.label,
        ),
      });
    }

    return output;
  }

  forFormCast() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .transform((value) => (value ? moment(value) : null));

    return yupChain;
  }

  forExport() {
    return yup.mixed().label(this.label);
  }

  forImport() {
    let yupChain = yup
      .mixed()
      .nullable(true)
      .label(this.label)
      .test(
        'is-date',
        i18n('validation.mixed.default'),
        (value) => {
          if (!value) {
            return true;
          }

          return value instanceof Date;
        },
      );

    if (this.required) {
      yupChain = yupChain.required();
    }

    return yupChain;
  }
}
