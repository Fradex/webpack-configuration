/// <reference path="~/WebResources/new_/js/lib/norbit.common.js" />

Type.registerNamespace("Norbit.Crm.Soglasie.Forms.Campaign");

import { NorbitHelpers } from '../lib/norbit.common.js';

var campaign = Norbit.Crm.Soglasie.Forms.Campaign;

/**
* Скрипт на загрузку формы Маркетинговая кампания.
*/
campaign.OnLoad = function () {
    Xrm.Helpers.Form.Subscriber
        .forControl("actualend")
        .addOnChange(setIsEmailCreated);

}



/**
* Устанавливает значение скрытого на форме поля Сообщение создано
* при обновлении поля "Дата окончания".
*/
function setIsEmailCreated() {
Xrm.Page.getAttribute("new_isemail_created").setValue(false);
Xrm.Page.getAttribute("new_isemail_created").setValue(false);
Xrm.Page.getAttribute("new_isemail_created").setValue(false);
    Xrm.Page.getAttribute("new_isemail_created").setValue(false);
}





