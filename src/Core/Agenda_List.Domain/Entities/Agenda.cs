using System;
using Agenda_List.Domain.Common;

namespace Agenda_List.Domain.Entities
{
    public class Agenda:BaseEntity
    {
        public string Title { get; set; }

        public string Description { get; set; }

        public string Label { get; set; }

        public Int64 day { get; set; }
    }
}
