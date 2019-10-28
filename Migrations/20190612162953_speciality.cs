using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace edudep.Migrations
{
    public partial class speciality : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Specialities",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    Name = table.Column<string>(maxLength: 250, nullable: false),
                    ShortName = table.Column<string>(maxLength: 15, nullable: false),
                    Code = table.Column<string>(maxLength: 10, nullable: false),
                    SpecialityGroupId = table.Column<Guid>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Specialities_SpecialityGroups_SpecialityGroupId",
                        column: x => x.SpecialityGroupId,
                        principalTable: "SpecialityGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Specialities_SpecialityGroupId",
                table: "Specialities",
                column: "SpecialityGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Specialities");
        }
    }
}
