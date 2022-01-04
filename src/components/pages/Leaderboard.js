import { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  Button,
  Card,
  Container,
  TablePagination,
  TableSortLabel,
  makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { theme } from "../theme";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Leaderboard() {
  const location = useLocation();
  const [game, setGame] = useState(
    location.pathname.includes("interval_ear_training")
      ? "interval_ear_training"
      : "note_id"
  );
  const query = useQuery();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState("desc");
  const [orderBy, setOrderBy] = useState("num_correct");
  const [offset, setOffset] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [scoreId, setScoreId] = useState(0);

  const useStyles = makeStyles(() => ({
    active: {
      backgroundColor: theme.palette.primary.main,
    },
    activeText: {
      color: theme.palette.primary.contrastText,
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    setScoreId(Number(query.get("score_id")));
  }, [query]);

  function handleSortChange(column) {
    if (orderBy === column) {
      setDirection(direction === "desc" ? "asc" : "desc");
    } else {
      setOrderBy(column);
      setDirection(column === "name" ? "asc" : "desc");
    }
  }

  function getGameType() {
    return location.pathname.includes("interval_ear_training")
      ? "interval_ear_training"
      : "note_id";
  }

  useEffect(() => {
    setGame(() => getGameType());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    let url = process.env.REACT_APP_LEADERBOARD_ENDPOINT;
    url += `?order_by=${
      direction === "desc" ? "-" : ""
    }${orderBy}&offset=${offset}&rows_per_page=${rowsPerPage}&game=${game}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setRows(() => data.scores);
        setCount(() => data.count);
        setLoading(() => false);
      });
  }, [orderBy, direction, offset, game, rowsPerPage]);

  if (loading) {
    return (
      <div className="content">
        <h2>Leaderboard</h2>
        <div>...loading</div>
      </div>
    );
  }
  return (
    <Container maxWidth="lg" style={{ marginBottom: "2rem" }}>
      <h2>Leaderboard</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "1rem",
          maxWidth: "100%",
        }}
      >
        <Link to="/leaderboard/note_id">
          <Button
            color={game === "note_id" ? "primary" : "secondary"}
            variant={game === "note_id" ? "contained" : ""}
            onClick={() => {
              setOffset(0);
            }}
          >
            Note Identification
          </Button>
        </Link>
        <Link to="/leaderboard/interval_ear_training">
          <Button
            color={game === "interval_ear_training" ? "primary" : "secondary"}
            variant={game === "interval_ear_training" ? "contained" : ""}
            onClick={() => {
              setOffset(0);
            }}
          >
            Interval Ear Training
          </Button>
        </Link>
      </div>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left" onClick={() => handleSortChange("name")}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? direction : "desc"}
                >
                  <strong>Name</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "num_correct"}
                  direction={orderBy === "num_correct" ? direction : "desc"}
                  onClick={() => handleSortChange("num_correct")}
                >
                  <strong>Correct</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "num_attempted"}
                  direction={orderBy === "num_attempted" ? direction : "desc"}
                  onClick={() => handleSortChange("num_attempted")}
                >
                  <strong>Attempts</strong>
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={orderBy === "percentage"}
                  direction={orderBy === "percentage" ? direction : "desc"}
                  onClick={() => handleSortChange("percentage")}
                >
                  <strong>Pct</strong>
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                className={row.id === scoreId ? classes.active : ""}
              >
                <TableCell
                  className={row.id === scoreId ? classes.activeText : ""}
                  component="th"
                  cope="row"
                >
                  {row.name}
                </TableCell>
                <TableCell
                  className={row.id === scoreId ? classes.activeText : ""}
                  align="center"
                >
                  {row.num_correct}
                </TableCell>
                <TableCell
                  className={row.id === scoreId ? classes.activeText : ""}
                  align="center"
                >
                  {row.num_attempted}
                </TableCell>
                <TableCell
                  className={row.id === scoreId ? classes.activeText : ""}
                  align="center"
                >
                  {row.percentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onChangeRowsPerPage={(e) => setRowsPerPage(e.target.value)}
            rowsPerPage={rowsPerPage}
            count={count}
            page={offset}
            onChangePage={(e, newOffset) => setOffset(newOffset)}
          />
        </div>
      </TableContainer>
    </Container>
  );
}
