import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackbar } from '../store/features/snackbar/snackbar';

export default function SnackBarListener() {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const { variant, message } = useSelector((state) => state.setSnackBar);

    useEffect(() => {
        if (message && variant) {
            enqueueSnackbar(message, { variant });
            dispatch(resetSnackbar()); // Clear the snackbar state after showing
        }
    }, [message, variant, enqueueSnackbar, dispatch]);

    return null;
}