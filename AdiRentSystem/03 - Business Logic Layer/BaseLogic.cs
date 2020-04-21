using System;

namespace JB
{
    public class BaseLogic : IDisposable
  {
    protected AdiRentEntities DB = new AdiRentEntities();

    public void Dispose()
    {
      DB.Dispose();
    }
  }
}
