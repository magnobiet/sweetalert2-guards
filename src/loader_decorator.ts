import Swal from 'sweetalert2';
import { makeDecorator, normalizeDecoratorArguments } from './decorator_factory';
import { GuardOptions } from './decorator_options';
import { MaybeVariadicThunk } from './decorator_runtime';

export function Loader(
    titleOrOptions: string | MaybeVariadicThunk<GuardOptions>,
    text?: string,
    typeOrOptions?: string | MaybeVariadicThunk<GuardOptions>
): MethodDecorator {

    const options = normalizeDecoratorArguments(arguments, {
        showConfirmButton: false,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading(),
        onBeforeOpen: Swal.clickConfirm
    });

    return makeDecorator(Loader, options);

}
