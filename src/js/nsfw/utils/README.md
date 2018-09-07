# UTILS



Just import what you want to use like that :

```
import { getScrollTop } from 'utils/scroll';

...

const scrollTop = getScrollTop();
```


You can also do :

```
import * as ScrollUtils from 'utils/scroll';

...

const scrollTop = ScrollUtils.getScrollTop();
const offsetTop = ScrollUtils.getOffsetTop($element);
ScrollUtils.scrollTo(0, 100);
```