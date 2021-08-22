import { Component, Inject } from '@angular/core';
import { DialogAlertOptions, DialogAlertResult, DialogAlertIcon, DialogAlertInput, ValueOrThunk, DialogAlertalign, customButton } from './alert.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent {

	responseData?: DialogAlertResult;

  title?: string | HTMLElement;
	titleText?: string | HTMLElement;
	text?: string | HTMLElement;

	html?: string | HTMLElement;
	footer?: string | HTMLElement;
	icon?: DialogAlertIcon;
	toast?: boolean;
	input?: DialogAlertInput;
  timer?: number;
	timerProgressBar?: boolean;
	allowOutsideClick?: ValueOrThunk<boolean>;
	showConfirmButton?: boolean;
	showCancelButton?: boolean;
	confirmButtonText?: string;
	cancelButtonText?: string;
	customButtons?: Array<customButton>;
	reverseButtons?: boolean;
	focusConfirm?: boolean;
	focusCancel?: boolean;
	closeButtonHtml?: string;
	closeButtonAriaLabel?: string;
	showLoaderOnConfirm?: boolean;
	imageUrl?: string;
	imageWidth?: number;
	imageHeight?: number;
	inputPlaceholder?: string;
	//personales
	alignButton:DialogAlertalign;

	constructor(
		public dialogRef: MatDialogRef<AlertDialogComponent>,
		@Inject(MAT_DIALOG_DATA)
		public data: DialogAlertOptions,


		private formBuilder: FormBuilder
	) {
		this.dialogRef.disableClose = true;

		this.title = data.title;
		this.titleText = data.titleText;
		this.text = data.text;

		this.html = data.html;
		this.footer = data.footer;
		this.icon = data.icon;

		if(data.customButtons){
			this.customButtons = data.customButtons;
		} else {
			this.showConfirmButton = data.showConfirmButton ? true : data.showConfirmButton;
			this.confirmButtonText = data.confirmButtonText ? data.confirmButtonText : 'Aceptar';

			this.showCancelButton = data.showCancelButton ? true : data.showCancelButton;
			this.cancelButtonText = data.cancelButtonText ? data.cancelButtonText : 'Cancelar';
		}

		this.timer = data.timer?data.timer:0 ;
		this.timerProgressBar = data.timerProgressBar;
		this.allowOutsideClick = data.allowOutsideClick;

		this.alignButton = data.alignButton ? data.alignButton : 'center';


	}

	onCancelClick(): void {
    this.responseData = {
			value: false
		};
		this.dialogRef.close();
	}

	onAceptarClick() {
		this.responseData = {
			value: true
		};
		return this.dialogRef.close(this.responseData);
	}

	onCustomClick(cusValue: any){
		this.responseData = {
			value: cusValue
		};
		return this.dialogRef.close(this.responseData);
	}

	geticon(icon:DialogAlertIcon){
		let material_icon ='';

		switch (icon) {
			case 'success':
				material_icon = 'check_circle_outline';
				break;
			case 'error':
				material_icon = 'highlight_off';
				break;
			case 'warning':
				material_icon = 'error_outline';
				break;
			case 'info':
				material_icon = 'chat';
				break;
			case 'question':
				material_icon = 'help_outline';
				break;
			default:
				break;
		}
		return material_icon;
	}

	getTexColor(icon:DialogAlertIcon){
		let color ='';

		switch (icon) {
			case 'success':
				color = 'success';
				break;
			case 'error':
				color = 'danger';
				break;
			case 'warning':
				color = 'warning';
				break;
			case 'info':
				color = 'info';
				break;
			case 'question':
				color = 'primary';
				break;
			default:
				break;
		}
		return color;
	}


}
