import Swal from 'sweetalert2';
import { makeDecorator, normalizeDecoratorArguments } from '../factory';
import { GuardOptions } from '../options';
import { MaybeVariadicThunk } from '../runtime';

export function Confirm(
    titleOrOptions: string | MaybeVariadicThunk<GuardOptions>,
    text?: string,
    typeOrOptions?: string | MaybeVariadicThunk<GuardOptions>
): MethodDecorator {

    const options = normalizeDecoratorArguments(arguments, {
        type: 'question',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading()
    });

    return makeDecorator(Confirm, options);

}
