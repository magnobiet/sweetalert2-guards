import Swal from 'sweetalert2';
import { makeDecorator, normalizeDecoratorArguments } from '../factory';
import { GuardOptions } from '../options';
import { MaybeVariadicThunk } from '../runtime';

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
