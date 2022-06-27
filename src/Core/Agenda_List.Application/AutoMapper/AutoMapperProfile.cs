using System;
using Agenda_List.Application.Dto.AgendaDto;
using Agenda_List.Domain.Entities;
using AutoMapper;

namespace Agenda_List.Application.AutoMapper
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Agenda, AgendaDto>().ReverseMap();
            CreateMap<Agenda, AgendaUpdateDto>().ReverseMap();
            CreateMap<AgendaResponseDto, Agenda>().ReverseMap();
        }
    }
}
