﻿using System.Web;
using System.Web.Mvc;

namespace PhongMach_Ver_1._0.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
