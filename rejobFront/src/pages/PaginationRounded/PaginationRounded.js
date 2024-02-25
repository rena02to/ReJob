import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ totalVagas, paginaAtual, onChangePagina}) {
    const vagasPorPagina = 8
    const numeroTotalPaginas = Math.ceil(totalVagas / vagasPorPagina)
    
    return (
        <Stack className='py-[24px]' spacing={2}>
            <Pagination
                count={numeroTotalPaginas}
                shape="rounded"
                page={ paginaAtual }
                onChange={(event, value) => onChangePagina(value)}
            />
        </Stack>
    );
}