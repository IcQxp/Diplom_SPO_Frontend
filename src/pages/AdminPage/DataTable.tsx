import { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const DataTable = ({
  data,
  columns,
  onEdit,
  onDelete,
}: {
  data: any[];
  columns: string[];
  onEdit: (id: number, updatedData: any) => void;
  onDelete: (id: number) => void;
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  const handleEditClick = (row: any) => {
    setEditingRow(row);
    setOpenEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingRow) {
      onEdit(editingRow.id, editingRow);
    }
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell key={index}>{column}</TableCell>
              ))}
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex}>{row[column]}</TableCell>
                ))}
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEditClick(row)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ ml: 1 }}
                    onClick={() => onDelete(row.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Модальное окно для редактирования */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Редактирование записи</DialogTitle>
        <DialogContent>
          {columns.map((column, index) => (
            <TextField
              key={index}
              label={column}
              fullWidth
              margin="dense"
              value={editingRow?.[column] || ""}
              onChange={(e) =>
                setEditingRow({ ...editingRow, [column]: e.target.value })
              }
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
          <Button onClick={handleSaveEdit}>Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DataTable;