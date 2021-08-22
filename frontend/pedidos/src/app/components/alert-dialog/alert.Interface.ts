export type DialogAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question';
export type DialogAlertalign = 'center' | 'start' | 'end' | 'flex-start' | 'flex-end';
export type tipeColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export type DialogAlertInput =
  'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' |
  'file' | 'url';

export type DialogAlertGrow = 'row' | 'column' | 'fullscreen' | false;

export interface customButton {
  value: string | number;
  name: string;
  tipe?: tipeColor;
}

export interface DialogAlertResult {
  value?: any;
  dismiss?: DismissReason;
}

export interface DialogAlertShowClass {
  popup?: string;
  backdrop?: string;
  icon?: string;
}

export interface DialogAlertHideClass {
  popup?: string;
  backdrop?: string;
  icon?: string;
}

enum DismissReason {
  cancel, backdrop, close, esc, timer
}

export type ValueOrThunk<T> = T | (() => T);

//export type DialogAlertArrayOptions = [string?, string?, DialogAlertIcon?, DialogAlertalign?];

export interface DialogAlertOptions {
  /**
   * The title of the modal, as HTML.
   * It can either be added to the object under the key "title" or passed as the first parameter of the function.
   *
   * @default ''
   */
  title?: string | HTMLElement;

  /**
   * The title of the modal, as text. Useful to avoid HTML injection.
   *
   * @default ''
   */
  titleText?: string;

  /**
   * A description for the modal.
   * It can either be added to the object under the key "text" or passed as the second parameter of the function.
   *
   * @default ''
   */
  text?: string;

  /**
   * A HTML description for the modal.
   * If "text" and "html" parameters are provided in the same time, "text" will be used.
   *
   * @default ''
   */
  html?: string | HTMLElement;

  /**
   * The footer of the modal, as HTML.
   *
   * @default ''
   */
  footer?: string | HTMLElement;

  /**
   * The icon of the modal.
   * DialogAlert2 comes with 5 built-in icons which will show a corresponding icon animation: 'warning', 'error',
   * 'success', 'info' and 'question'.
   * It can either be put in the array under the key "icon" or passed as the third parameter of the function.
   *
   * @default undefined
   */
  icon?: DialogAlertIcon;

  /**
   * Whether or not an alert should be treated as a toast notification.
   * This option is normally coupled with the `position` parameter and a timer.
   * Toasts are NEVER autofocused.
   *
   * @default false
   */
  toast?: boolean;

  /**
   * Input field type, can be text, email, password, number, tel, range, textarea, select, radio, checkbox, file
   * and url.
   *
   * @default undefined
   */
  input?: DialogAlertInput;

  /**
   * Auto close timer of the modal. Set in ms (milliseconds).
   *
   * @default undefined
   */
  timer?: number;

  /**
   * If set to true, the timer will have a progress bar at the bottom of a popup.
   * Mostly, this feature is useful with toasts.
   *
   * @default false
   */
  timerProgressBar?: boolean;


  /**
   * If set to false, the user can't dismiss the modal by clicking outside it.
   * You can also pass a custom function returning a boolean value, e.g. if you want
   * to disable outside clicks for the loading state of a modal.
   *
   * @default true
   */
  allowOutsideClick?: ValueOrThunk<boolean>;

  /**
   * If set to false, a "Confirm"-button will not be shown.
   * It can be useful when you're using custom HTML description.
   *
   * @default true
   */
  showConfirmButton?: boolean;

  /**
   * If set to true, a "Cancel"-button will be shown, which the user can click on to dismiss the modal.
   *
   * @default false
   */
  showCancelButton?: boolean;

  /**
   * Use this to change the text on the "Confirm"-button.
   *
   * @default 'OK'
   */
  confirmButtonText?: string;

  /**
   * Use this to change the text on the "Cancel"-button.
   *
   * @default 'Cancel'
   */
  cancelButtonText?: string;

  /**
   * Set to true if you want to invert default buttons positions.
   *
   * @default false
   */
  reverseButtons?: boolean;

  /**
   * Set to false if you want to focus the first element in tab order instead of "Confirm"-button by default.
   *
   * @default true
   */
  focusConfirm?: boolean;

  /**
   * Set to true if you want to focus the "Cancel"-button by default.
   *
   * @default false
   */
  focusCancel?: boolean;

  /**
   * Use this to change the content of the close button.
   *
   * @default '&times;'
   */
  closeButtonHtml?: string;

  /**
   * Use this to change the `aria-label` for the close button.
   *
   * @default 'Close this dialog'
   */
  closeButtonAriaLabel?: string;

  /**
   * Set to true to disable buttons and show that something is loading. Useful for AJAX requests.
   *
   * @default false
   */
  showLoaderOnConfirm?: boolean;

  /**
   * Add a customized icon for the modal. Should contain a string with the path or URL to the image.
   *
   * @default undefined
   */
  imageUrl?: string;

  /**
   * If imageUrl is set, you can specify imageWidth to describes image width in px.
   *
   * @default undefined
   */
  imageWidth?: number;

  /**
   * If imageUrl is set, you can specify imageHeight to describes image height in px.
   *
   * @default undefined
   */
  imageHeight?: number;

  /**
   * Input field placeholder.
   *
   * @default ''
   */
  inputPlaceholder?: string;

  /**
   * aliniacion de los botones
   */
  alignButton?: DialogAlertalign;


  customButtons: Array<customButton>;
}
