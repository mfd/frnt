import notifier from 'node-notifier';

export default function notify ( title, message, options = {} ) {
    notifier.notify({
        title,
        message,
        ...options,
    });
};