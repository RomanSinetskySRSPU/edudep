using Microsoft.EntityFrameworkCore.Migrations;

namespace edudep.Migrations
{
    public partial class testbool : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "TestBool",
                table: "Specialities",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestBool",
                table: "Specialities");
        }
    }
}
