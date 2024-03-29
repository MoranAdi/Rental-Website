using System.Net.Http.Headers;
using System.Web.Http;

namespace JB
{
  public static class WebApiConfig
  {
    public static void Register(HttpConfiguration config)
    {
      config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

      config.EnableCors();


      // Web API configuration and services

      // Web API routes
      config.MapHttpAttributeRoutes();

      config.Routes.MapHttpRoute(
          name: "DefaultApi",
          routeTemplate: "api/{controller}/{id}",
          defaults: new { id = RouteParameter.Optional }
      );
    }
  }
}
