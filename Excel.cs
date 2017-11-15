using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;

namespace PhongMach_Ver_1._0.Web
{
    public static class Excel
    {
        public static DataTable ConvertXlsxToDataTable(string path)
        {
            XSSFWorkbook xssfworkbook;
            //HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                xssfworkbook = new XSSFWorkbook(file);
            }
            ISheet sheet = xssfworkbook.GetSheetAt(0);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();
            int count = 0;
            int countCol = 0;
            while (rows.MoveNext())
            {
                if (count == 0)
                {
                    IRow rowh = (XSSFRow)rows.Current;
                    for (int i = 0; i < rowh.LastCellNum; i++)
                    {
                        ICell cell = rowh.GetCell(i);
                        if (cell == null)
                        {
                            dt.Columns.Add("");
                        }
                        else
                        {
                            dt.Columns.Add(cell.ToString());
                        }
                        countCol++;
                    }
                    count++;
                }
                else
                {
                    IRow row = (XSSFRow)rows.Current;
                    DataRow dr = dt.NewRow();
                    for (int i = 0; i < row.LastCellNum && i <= countCol; i++)
                    {
                        ICell cell = row.GetCell(i);
                        if (cell == null)
                        {
                            dr[i] = null;
                        }
                        else
                        {
                            dr[i] = cell.ToString();
                        }
                    }
                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }

        public static DataTable ConvertXlsxToDataTable(string path, int rowStart)
        {
            try
            {
                XSSFWorkbook xssfworkbook;
                //HSSFWorkbook hssfworkbook;
                using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
                {
                    xssfworkbook = new XSSFWorkbook(file);
                }

                ISheet sheet = xssfworkbook.GetSheetAt(0);
                System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
                DataTable dt = new DataTable();

                int loopStart = 1;
                int count = 0;
                int countCol = 0;
                try
                {
                    while (rows.MoveNext())
                    {
                        if (loopStart > rowStart)
                        {
                            if (count == 0)
                            {
                                IRow rowh = (XSSFRow)rows.Current;
                                for (int i = 0; i < rowh.LastCellNum; i++)
                                {
                                    ICell cell = rowh.GetCell(i);
                                    if (cell == null)
                                    {
                                        dt.Columns.Add("");
                                    }
                                    else
                                    {
                                        dt.Columns.Add(cell.ToString());
                                    }
                                    countCol++;
                                }
                                count++;
                            }
                            else
                            {
                                IRow row = (XSSFRow)rows.Current;
                                DataRow dr = dt.NewRow();
                                for (int i = 0; i < row.LastCellNum && i < countCol; i++)
                                {
                                    ICell cell = row.GetCell(i);
                                    if (cell == null)
                                    {
                                        dr[i] = null;
                                    }
                                    else
                                    {
                                        dr[i] = cell.ToString();
                                    }
                                }
                                dt.Rows.Add(dr);
                            }
                        }
                        else
                            loopStart += 1;
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("DataTable ConvertXLSXToDataTable(string path,int rowStart)");
                }
                return dt;
            }
            catch (Exception ex)
            {
                throw new Exception("loi gi day" + ex.ToString());
            }
        }

        public static DataTable ConvertXlsxToDataTable(string path, int rowStart, int indexSheet)
        {
            XSSFWorkbook xssfworkbook;
            //HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                xssfworkbook = new XSSFWorkbook(file);
            }
            ISheet sheet = xssfworkbook.GetSheetAt(indexSheet);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();

            int loopStart = 1;
            int count = 0;
            int countCol = 0;
            try
            {
                while (rows.MoveNext())
                {
                    if (loopStart > rowStart)
                    {
                        if (count == 0)
                        {
                            IRow rowh = (XSSFRow)rows.Current;
                            for (int i = 0; i < rowh.LastCellNum; i++)
                            {
                                ICell cell = rowh.GetCell(i);
                                if (cell == null)
                                {
                                    dt.Columns.Add("");
                                }
                                else
                                {
                                    dt.Columns.Add(cell.ToString());
                                }
                                countCol++;
                            }
                            count++;
                        }
                        else
                        {
                            IRow row = (XSSFRow)rows.Current;
                            DataRow dr = dt.NewRow();
                            for (int i = 0; i < row.LastCellNum && i < countCol; i++)
                            {
                                ICell cell = row.GetCell(i);
                                if (cell == null)
                                {
                                    dr[i] = null;
                                }
                                else
                                {
                                    dr[i] = cell.ToString();
                                }
                            }
                            dt.Rows.Add(dr);
                        }
                    }
                    else
                        loopStart += 1;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return dt;
        }
        public static DataTable ConvertXlsToDataTable(string path)
        {
            //XSSFWorkbook xssfworkbook;
            HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                hssfworkbook = new HSSFWorkbook(file);
            }
            ISheet sheet = hssfworkbook.GetSheetAt(0);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();

            int count = 0;
            while (rows.MoveNext())
            {
                if (count == 0)
                {
                    IRow rowh = (HSSFRow)rows.Current;
                    for (int i = 0; i < rowh.LastCellNum; i++)
                    {
                        ICell cell = rowh.GetCell(i);
                        if (cell == null)
                        {
                            dt.Columns.Add("");
                        }
                        else
                        {
                            dt.Columns.Add(cell.ToString());
                        }
                    }
                    count++;
                }
                else
                {
                    IRow row = (HSSFRow)rows.Current;
                    DataRow dr = dt.NewRow();

                    for (int i = 0; i < row.LastCellNum; i++)
                    {
                        ICell cell = row.GetCell(i);
                        if (cell == null)
                        {
                            dr[i] = null;
                        }
                        else
                        {
                            dr[i] = cell.ToString();
                        }
                    }
                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }

        public static DataTable ConvertXlsToDataTable(string path, int rowStart, int indexSheet)
        {
            //XSSFWorkbook xssfworkbook;
            HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                hssfworkbook = new HSSFWorkbook(file);
            }
            ISheet sheet = hssfworkbook.GetSheetAt(indexSheet);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();

            int loopStart = 1;
            int count = 0;
            int countCol = 0;
            try
            {
                while (rows.MoveNext())
                {

                    if (loopStart > rowStart)
                    {
                        if (count == 0)
                        {
                            IRow rowh = (HSSFRow)rows.Current;
                            try
                            {
                                for (int i = 0; i < rowh.LastCellNum; i++)
                                {
                                    ICell cell = rowh.GetCell(i);
                                    if (cell == null)
                                    {
                                        dt.Columns.Add("");
                                    }
                                    else
                                    {
                                        dt.Columns.Add(cell.ToString());
                                    }
                                    countCol++;
                                }
                            }
                            catch (Exception ex)
                            {
                                throw new Exception(ex.Message);
                            }
                            count++;
                        }
                        else
                        {
                            IRow row = (HSSFRow)rows.Current;
                            DataRow dr = dt.NewRow();

                            for (int i = 0; i < row.LastCellNum && i <= countCol; i++)
                            {
                                ICell cell = row.GetCell(i);
                                if (cell == null)
                                {
                                    dr[i] = null;
                                }
                                else
                                {
                                    try
                                    {
                                        dr[i] = cell.ToString();
                                    }
                                    catch (Exception ex)
                                    {
                                        // throw new Exception("File excel import bi lỗi");
                                    }
                                }
                            }
                            dt.Rows.Add(dr);
                        }
                    }
                    else
                        loopStart += 1;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return dt;
        }

        public static DataTable ConvertXlsToDataTable(string path, int rowStart)
        {
            //XSSFWorkbook xssfworkbook;
            HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                hssfworkbook = new HSSFWorkbook(file);
            }
            ISheet sheet = hssfworkbook.GetSheetAt(0);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();

            int loopStart = 1;
            int count = 0;
            int countCol = 0;
            try
            {
                while (rows.MoveNext())
                {

                    if (loopStart > rowStart)
                    {
                        if (count == 0)
                        {
                            IRow rowh = (HSSFRow)rows.Current;
                            try
                            {
                                for (int i = 0; i < rowh.LastCellNum; i++)
                                {
                                    ICell cell = rowh.GetCell(i);
                                    if (cell == null)
                                    {
                                        dt.Columns.Add("");
                                    }
                                    else
                                    {
                                        dt.Columns.Add(cell.ToString());
                                    }
                                    countCol++;
                                }
                            }
                            catch (Exception ex)
                            {
                                throw new Exception(ex.Message);
                            }
                            count++;
                        }
                        else
                        {
                            IRow row = (HSSFRow)rows.Current;
                            DataRow dr = dt.NewRow();

                            for (int i = 0; i < row.LastCellNum && i <= countCol; i++)
                            {
                                ICell cell = row.GetCell(i);
                                if (cell == null)
                                {
                                    dr[i] = null;
                                }
                                else
                                {
                                    if (i < dt.Columns.Count)
                                    {
                                        try
                                        {
                                            dr[i] = cell.ToString();
                                        }
                                        catch (Exception ex)
                                        {
                                            throw new Exception(ex.Message);
                                        }
                                    }
                                }
                            }
                            dt.Rows.Add(dr);
                        }
                    }
                    else
                        loopStart += 1;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return dt;
        }

        public static DataTable ConvertXlsxToDataTableNew(string path)
        {
            XSSFWorkbook xssfworkbook;
            //HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                xssfworkbook = new XSSFWorkbook(file);
            }
            ISheet sheet = xssfworkbook.GetSheetAt(0);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();
            int count = 0;
            int countCol = 0;
            while (rows.MoveNext())
            {
                if (count == 0)
                {
                    IRow rowh = (XSSFRow)rows.Current;
                    for (int i = 0; i < rowh.LastCellNum; i++)
                    {
                        ICell cell = rowh.GetCell(i);
                        if (cell == null)
                        {
                            dt.Columns.Add("");
                        }
                        else
                        {
                            dt.Columns.Add(cell.ToString());
                        }
                        countCol++;
                    }
                    count++;
                }
                else
                {
                    IRow row = (XSSFRow)rows.Current;
                    DataRow dr = dt.NewRow();
                    for (int i = 0; i < row.LastCellNum && i < countCol; i++)
                    {


                        ICell cell = row.GetCell(i);
                        if (cell == null)
                        {
                            dr[i] = null;
                        }
                        else
                        {
                            dr[i] = cell.ToString();
                        }
                    }
                    dt.Rows.Add(dr);
                }
            }
            return dt;
        }


        public static DataTable ConvertXlsxToDataTableNew(string path, int startrow)
        {
            XSSFWorkbook xssfworkbook;
            //HSSFWorkbook hssfworkbook;
            using (FileStream file = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                xssfworkbook = new XSSFWorkbook(file);
            }
            ISheet sheet = xssfworkbook.GetSheetAt(0);
            System.Collections.IEnumerator rows = sheet.GetRowEnumerator();
            DataTable dt = new DataTable();
            int count = 0;
            int countCol = 0;
            while (rows.MoveNext())
            {
                IRow row = (XSSFRow)rows.Current;
                if (row.RowNum >= startrow)
                {
                    DataRow dr = dt.NewRow();
                    DataColumn column = new DataColumn();
                    //object[] rowData = new object[row.LastCellNum];
                    for (int i = 0; i < row.LastCellNum; i++)
                    {
                        //if (dt.Columns[i] == null)
                        //{
                        //    dt.Columns.Add();
                        //}
                        dt.Columns.Add();
                        ICell cell = row.GetCell(i);
                        if (cell == null || cell.ToString() == "")
                        {
                            dr[i] = null;
                            count = count + 1;
                        }

                        else
                        {
                            dr[i] = cell.ToString();
                        }
                    }

                    if (count == row.LastCellNum)
                    {
                        break;
                    }
                    dt.Rows.Add(dr);
                    count = 0;
                }

            }
            return dt;
        }
    }
}