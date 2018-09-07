class SearchFilterInput {
    constructor(el) {
        this.view = el;
        this.dom = {
            $input: $(this.view).find('.psearch__search-input .form-control'),
            $btnClear: $(this.view).find('.psearch__search-btn--clear')
        }

        this.init();
        console.log('🔍');
    }
    init() {
        let $input = this.dom.$input;
        let $btnClear = this.dom.$btnClear;
        let $view = $(this.view)
        this.val = $input.val();

        this.checkVal();
        $input.on('focus keypress keydown blur change input focusin', this.checkVal.bind(this));
        $btnClear.on('click', this.clear.bind(this));
    }
    checkVal() {
        let $input = this.dom.$input;
        let $view = $(this.view);
        let val = $input.val();
        //console.log({val})
        if (val) {
            $view.addClass('isFillInput')
        } else {
            $view.removeClass('isFillInput')
        }
    }
    clear(e) {
        //console.info(e, e.target, e.currentTarget);
        let namespace = $(e.currentTarget).data('namesubmit');
        let startVal = this.val;
        let curVal = this.dom.$input.val();

        if (startVal === curVal) {
            document.getElementById(`${namespace}keywords`).value='';
            window[`${namespace}fm`].submit();
        } else {
            document.getElementById(`${namespace}keywords`).value='';
        }

        //debugger
        // document.getElementById('<%= renderResponse.getNamespace() %>keywords').value='';
        // <%= renderResponse.getNamespace() %>fm.submit();
    }
}

const el = $('.psearch')[0];
if (el) new SearchFilterInput(el)


