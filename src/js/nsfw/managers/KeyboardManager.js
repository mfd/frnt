class KeyboardManager {

    static start ( event = 'keypress' ) {
        KeyboardManager.views = [];

        window.addEventListener(event, KeyboardManager.onKeyPress);
    }

    static bind ( id, fn ) {
        KeyboardManager.views.push({ id, fn });
    }

    static unbind ( id ) {
        let tgtID = -1;

        for(let i=0; i < KeyboardManager.views.length; i++)
        {
            if(KeyboardManager.views[i].id === id)
            {
                tgtID = i;
                break;
            }
        }

        if( tgtID > -1 ) KeyboardManager.views.splice( tgtID, 1);
    }

    static onKeyPress ( event ) {
        for ( let i = 0; i < KeyboardManager.views.length; i++ ){
            KeyboardManager.views[i].fn(event);
        }
    }

}

export default KeyboardManager;