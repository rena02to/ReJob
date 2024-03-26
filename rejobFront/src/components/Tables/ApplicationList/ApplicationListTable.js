import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useEffect, useState } from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import CandidateModal from "../../CandidateModal/CandidateModal";
import api from "../../../services/api";
import { statusMapper } from "../../../utils/utils";
import SearchIcon from "@mui/icons-material/Search";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name, email, phone, status, similarity) {
  return { name, email, phone, status: statusMapper(status), similarity };
}

export default function CustomPaginationActionsTable(props) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [candidates, setCandidates] = useState([]);
  const [rows, setRows] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [filterCandidates, setFilterCandidates] = useState([]);
  const jobId = props.id ?? null;

  useEffect(() => {
    const fetchCandidates = async () => {
      if (jobId) {
        try {
          const response = await api.get(`/jobApplications/job/${jobId}`);
          setCandidates(response.data);
        } catch (error) {
          console.error("Erro ao obter candidatos:", error);
        }
      }
    };

    fetchCandidates();
  }, []);

  candidates.map((candidate, _) => {
    createData(candidate.applicant.user.name);
  });

  useEffect(() => {
    const values = [];
    values.push(createData("NOME", "EMAIL", "TELEFONE", "STATUS", "MATCH"));
    candidates.forEach((candidate, _) => {
      values.push(
        createData(
          candidate.applicant?.user?.name,
          candidate.applicant?.user?.email,
          candidate.applicant?.user?.phoneNumber,
          candidate.status,
          candidate.similarity
        )
      );
    });
    setFilterCandidates(values);
    setRows(values);
  }, [candidates]);

  const filter = (searchTerm) => {
    if (!searchTerm) {
      setFilterCandidates(rows);
    } else {
      const newRows = rows.filter((candidate) => {
        return (
          candidate?.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          candidate?.email.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          candidate?.phone.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          candidate?.status.toLowerCase().includes(searchTerm?.toLowerCase())
        );
      });
      setFilterCandidates(newRows);
    }
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filterCandidates.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const openModal = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCandidate(null);
    setModalOpen(false);
  };

  return (
    <div>
      <CandidateModal
        isOpen={modalOpen}
        onClose={closeModal}
        candidate={selectedCandidate}
        height={"600px"}
        jobId={jobId}
      />
      <div className="relative py-8 ">
        <input
          className="absolute top-[-12px] h-[42px] w-full"
          type="text"
          placeholder="Pesquise qualquer informação de vaga aqui"
          onChange={(e) => filter(e.target.value)}
        />

        <SearchIcon
          onClick={(e) => filter(e.target.value)}
          style={{ color: "#00a3ff" }}
          className="absolute hover:scale-110 hover:-translate-y-1 transition duration-300 ease-in-out delay-150 top-[-3px] right-[24px] h-[42px] w-full hover:bg-slate-100 hover: cursor-pointer rounded-full"
        />
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? filterCandidates.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : filterCandidates
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.email}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.phone}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {row.status}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {typeof row.similarity === "number"
                    ? (row.similarity * 100).toFixed(2) + "%"
                    : "MATCH"}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {index === 0 && page === 0 ? null : (
                    <IconButton
                      onClick={() =>
                        openModal(
                          candidates[index - (page === 0 ? 1 : 1 - rowsPerPage)]
                        )
                      }
                    >
                      <DescriptionIcon className="text-customColor" />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
                colSpan={3}
                count={filterCandidates.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Linhas por Página"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}
