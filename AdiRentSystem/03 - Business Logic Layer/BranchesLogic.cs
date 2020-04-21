using System.Collections.Generic;
using System.Linq;

namespace JB
{
    public class BranchesLogic : BaseLogic
    {
        public List<BranchDTO> GetAllBranches()
        {
            var q = from b in DB.Branches
                    select new BranchDTO
                    {
                        id = b.BranchID,
                        branchName = b.BranchName
                    };
            return q.ToList();
        }
    }
}
