class FindedUsers {
    constructor(el) {
        this.view = el;
        this.opt = {
            userId: $(el).attr("data-id"),
            companyId: Liferay.Portlet.findUsersVars.companyId,
            targetUserId: Liferay.Portlet.findUsersVars.targetUserId,
            userName: $(el).find('.list-item__title').text(),
            cardUrl: $(el).data('orgurl') + '/-/psmvc/usercard/' +  el.data('id')
        }
        this.isDeleted = $(this.view).find('.list-item__action-link').hasClass('list-item__action--delete');
        this.init();
    }
    init() {
        $(this.view).on('click', this.openCard.bind(this));
        $(this.view).on('click', '.list-item__action-link', this.userAction.bind(this));
    }
    userAction(e) {
        if (!this.isDeleted) {
            this.addUser(e);
        } else {
            this.removeUser(e);
        }
    }
    openCard(e) {
        //console.info(e, e.target, e.currentTarget);
        var $cardUrl = this.opt.cardUrl;
        if ($(e.target).hasClass('list-item')) {
            viewInDialogS($cardUrl,'Пользователь');
        }
        e.preventDefault();
    }
    addUser(e) {
        var _self = this;
        var view = this.view;
        var $userId = this.opt.userId;
        var $companyId = this.opt.companyId;
        var $targetUserId = this.opt.targetUserId;
        var $userName = this.opt.userName;
        //var $newBtn = '<span class="fa fa-minus"></a>';
        var $newBtn = '';

        e.preventDefault();

        Liferay.Service('/psc.contact/add-contact-user', {
                companyId:     $companyId,
                targetUserId:  $targetUserId,
                contactUserId: $userId,
                currentUserId: $targetUserId
            },
            function(obj) {
                console.log(obj);
                if (obj.assetEntryId) {
                    _self.isDeleted = true;
                    $(view).find('.list-item__action-link').html($newBtn);
                    swal(`Добавлено!`, `Пользователь ${$userName} добавлен в ваши контакты`, 'success');
                } else {
                    swal('Ошибка', obj, 'error');
                }
            }
        );
    }
    removeUser(e) {
        console.log('del');
        var _self = this;
        var view = this.view;
        var $targetUserId = this.opt.targetUserId;
        var $userId = this.opt.userId;
        var $companyId = this.opt.companyId;
        var $targetUserId = this.opt.targetUserId;
        var $userName = this.opt.userName;
        var $newBtn = '<span class="fa fa-plus"></a>';

        e.preventDefault();

        Liferay.Service('/psc.contact/delete-contact-user', {
            targetUserId:  $targetUserId,
            contactUserId: $userId
            },
            function(obj) {
                console.log(obj);
                if (obj) {
                    _self.isDeleted = false;
                    $(view).find('.list-item__action-link').html($newBtn);
                    swal('Удалено!',`Пользователь ${$userName} удален из ваших контактов`,'warning');
                }
            }
        );
    }


}
const init = function() {
    const elems = document.querySelectorAll('.listlist .list-item');
    for (var i = 0; i < elems.length; i++) {
      new FindedUsers(elems[i]);
    }
}

init();

