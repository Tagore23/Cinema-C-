﻿// <auto-generated />
using System;
using Cinema.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Cinema.Migrations
{
    [DbContext(typeof(AppDataContext))]
    [Migration("20240630212930_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.5");

            modelBuilder.Entity("Cinema.Models.Estoque", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("TEXT");

                    b.Property<string>("filme")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("quantidade")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Estoques");
                });

            modelBuilder.Entity("Cinema.Models.Filme", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Genero")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Sinopse")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Filmes");
                });

            modelBuilder.Entity("Cinema.Models.Sessao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Data")
                        .HasColumnType("TEXT");

                    b.Property<int>("FilmeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Horario")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("IngressosDisponiveis")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("PrecoIngresso")
                        .HasColumnType("TEXT");

                    b.Property<string>("Sala")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("FilmeId");

                    b.ToTable("Sessoes");
                });

            modelBuilder.Entity("Cinema.Models.Venda", b =>
                {
                    b.Property<int>("VendaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("DataVenda")
                        .HasColumnType("TEXT");

                    b.Property<int>("Filme")
                        .HasColumnType("INTEGER");

                    b.Property<int>("FilmeId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("NomeCliente")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("QuantidadeIngressos")
                        .HasColumnType("INTEGER");

                    b.Property<int>("SessaoId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Titulo")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("ValorPago")
                        .HasColumnType("TEXT");

                    b.HasKey("VendaId");

                    b.HasIndex("SessaoId");

                    b.ToTable("Vendas");
                });

            modelBuilder.Entity("Cinema.Models.Sessao", b =>
                {
                    b.HasOne("Cinema.Models.Filme", "Filme")
                        .WithMany()
                        .HasForeignKey("FilmeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Filme");
                });

            modelBuilder.Entity("Cinema.Models.Venda", b =>
                {
                    b.HasOne("Cinema.Models.Sessao", "Sessao")
                        .WithMany()
                        .HasForeignKey("SessaoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Sessao");
                });
#pragma warning restore 612, 618
        }
    }
}
