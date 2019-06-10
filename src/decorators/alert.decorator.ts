import Swal from 'sweetalert2';
import { makeDecorator, normalizeDecoratorArguments } from '../factory';
import { GuardOptions } from '../options';
import { MaybeVariadicThunk } from '../runtime';

export function Alert(
    titleOrOptions: string | MaybeVariadicThunk<GuardOptions>,
    text?: string,
    typeOrOptions?: string | MaybeVariadicThunk<GuardOptions>
): MethodDecorator {

    const options = normalizeDecoratorArguments(arguments, {
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading()
    });

    return makeDecorator(Alert, options);

}
