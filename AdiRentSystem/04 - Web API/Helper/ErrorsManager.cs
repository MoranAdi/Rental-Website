using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.ModelBinding;

namespace JB
{
    public class ErrorsManager
    {
        public static string GetInnerMessage(Exception ex)
        {
#if DEBUG
            if (ex.InnerException == null)
                return ex.Message;

            return GetInnerMessage(ex.InnerException);
#else
      return "Some error occurred, please try again.";
#endif
        }

        public static List<string> GetErrors(ModelStateDictionary modelState)
        {
            List<string> errors = new List<string>();

            #region Inner Loop

            foreach (var property in modelState.Values)
            {
                foreach (var err in property.Errors)
                {
                    errors.Add(err.ErrorMessage);
                }
            }
            #endregion
            return errors;
        }
    }
}
