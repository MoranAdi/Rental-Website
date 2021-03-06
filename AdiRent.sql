USE [master]
GO
/****** Object:  Database [AdiRent]    Script Date: 21/04/2020 17:51:19 ******/
CREATE DATABASE [AdiRent]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AdiRent', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\AdiRent.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AdiRent_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\AdiRent_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [AdiRent] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AdiRent].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AdiRent] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AdiRent] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AdiRent] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AdiRent] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AdiRent] SET ARITHABORT OFF 
GO
ALTER DATABASE [AdiRent] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AdiRent] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AdiRent] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AdiRent] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AdiRent] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AdiRent] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AdiRent] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AdiRent] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AdiRent] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AdiRent] SET  DISABLE_BROKER 
GO
ALTER DATABASE [AdiRent] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AdiRent] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AdiRent] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AdiRent] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AdiRent] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AdiRent] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [AdiRent] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AdiRent] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [AdiRent] SET  MULTI_USER 
GO
ALTER DATABASE [AdiRent] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AdiRent] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AdiRent] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AdiRent] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AdiRent] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AdiRent] SET QUERY_STORE = OFF
GO
USE [AdiRent]
GO
/****** Object:  Table [dbo].[Branches]    Script Date: 21/04/2020 17:51:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Branches](
	[BranchID] [int] IDENTITY(1,1) NOT NULL,
	[Address] [nvarchar](250) NOT NULL,
	[Latitude] [float] NOT NULL,
	[Longitude] [float] NOT NULL,
	[BranchName] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Branches] PRIMARY KEY CLUSTERED 
(
	[BranchID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cars]    Script Date: 21/04/2020 17:51:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cars](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[CarTypeID] [int] NOT NULL,
	[BranchID] [int] NOT NULL,
	[CarPlateNumber] [nvarchar](50) NOT NULL,
	[CarType] [nvarchar](50) NOT NULL,
	[CurrentMileage] [int] NOT NULL,
	[Photo] [nvarchar](50) NOT NULL,
	[Rentable] [bit] NOT NULL,
 CONSTRAINT [PK_Cars] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarsType]    Script Date: 21/04/2020 17:51:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarsType](
	[CarTypeID] [int] IDENTITY(1,1) NOT NULL,
	[Manufacturer] [nvarchar](50) NOT NULL,
	[Model] [nvarchar](50) NOT NULL,
	[DailyPrice] [money] NOT NULL,
	[DailyOverduePrice] [money] NOT NULL,
	[ManufacturerYear] [nvarchar](50) NOT NULL,
	[ShiftGear] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_CarsType] PRIMARY KEY CLUSTERED 
(
	[CarTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RentalOrders]    Script Date: 21/04/2020 17:51:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RentalOrders](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[StartDate] [datetime] NOT NULL,
	[EndDate] [datetime] NOT NULL,
	[ActualEndDate] [datetime] NULL,
	[UserID] [int] NOT NULL,
	[CarTypeID] [int] NOT NULL,
	[CarID] [int] NOT NULL,
	[PlateNumber] [nvarchar](10) NOT NULL,
	[OrderStatus] [nvarchar](5) NULL,
	[OrderNumber] [nvarchar](100) NULL,
 CONSTRAINT [PK_RentalOrders] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 21/04/2020 17:51:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[IDNumber] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[UserName] [nvarchar](50) NOT NULL,
	[Birthdate] [datetime] NULL,
	[Gender] [nvarchar](10) NOT NULL,
	[Email] [nvarchar](200) NOT NULL,
	[Password] [nvarchar](100) NOT NULL,
	[Role] [nvarchar](50) NOT NULL,
	[Photo] [nvarchar](200) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Branches] ON 

INSERT [dbo].[Branches] ([BranchID], [Address], [Latitude], [Longitude], [BranchName]) VALUES (1, N'113 Hayarkon st. Tel Aviv', 32.080799, 34.76825, N'Tel Aviv')
INSERT [dbo].[Branches] ([BranchID], [Address], [Latitude], [Longitude], [BranchName]) VALUES (2, N'19 Hamelech david st. Jerusalem', 31.77554, 35.22228, N'Jerusalem')
INSERT [dbo].[Branches] ([BranchID], [Address], [Latitude], [Longitude], [BranchName]) VALUES (3, N'2 Ha''amakim st. Tiberias', 32.78975, 35.53363, N'Tiberias')
INSERT [dbo].[Branches] ([BranchID], [Address], [Latitude], [Longitude], [BranchName]) VALUES (4, N'5 Itzhak Rabin road, Petah-Tiqwa', 32.07715, 34.86038, N'Petah-Tiqwa')
INSERT [dbo].[Branches] ([BranchID], [Address], [Latitude], [Longitude], [BranchName]) VALUES (5, N'5 Platin st., Ramat-Gan', 32.07715, 34.86038, N'Ramat-Gan')
SET IDENTITY_INSERT [dbo].[Branches] OFF
SET IDENTITY_INSERT [dbo].[Cars] ON 

INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (1, 1, 1, N'1805862', N'Standart', 11000, N'52d0f6f2-0d85-4620-b454-bdec9d3cdda7.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (2, 2, 2, N'1743986', N'Compact', 7000, N'c6cd4bf0-3231-4595-b484-3e4b3d0e080d.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (3, 3, 3, N'2485904', N'Premium', 2000, N'1f210b84-e5c6-416d-9e7b-61784346c3f4.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (4, 4, 4, N'15983582', N'Compact', 14000, N'759b3d19-e060-46d5-89e6-87ab0ed6d73c.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (6, 6, 5, N'2763846', N'Standart', 11300, N'31d74174-3285-4ed7-a87c-646311be0abc.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (8, 8, 1, N'23986356', N'Premium', 3200, N'55092539-33b2-43ce-825e-bcc91d341dfa.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (9, 9, 3, N'27450271', N'Premium', 2674, N'2a87965a-0aec-43be-836d-529e0cf492c8.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (10, 10, 4, N'17256489', N'Luxury', 5000, N'0098f7a2-66eb-45c4-ac61-9c74946b4b69.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (11, 11, 3, N'32847932', N'Luxury', 4736, N'f4e7bb64-5b6a-44c0-bfbc-e20531ad6a95.png', 1)
INSERT [dbo].[Cars] ([CarID], [CarTypeID], [BranchID], [CarPlateNumber], [CarType], [CurrentMileage], [Photo], [Rentable]) VALUES (13, 5, 5, N'17846739', N'Standart', 8000, N'27efc9b9-6526-4da5-b09e-44c4017267b5.png', 0)
SET IDENTITY_INSERT [dbo].[Cars] OFF
SET IDENTITY_INSERT [dbo].[CarsType] ON 

INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (1, N'Honda', N'Civic', 260.0000, 300.0000, N'2008      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (2, N'Hyundai', N'i20', 150.0000, 200.0000, N'2006      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (3, N'Hyundai', N'iX35', 350.0000, 400.0000, N'2009      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (4, N'Kia', N'Picanto', 180.0000, 220.0000, N'2007      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (5, N'Kia', N'Stonic', 280.0000, 320.0000, N'2008      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (6, N'Mazda', N'3', 260.0000, 300.0000, N'2007      ', N'Automatic ')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (8, N'Kia', N'Stonic', 400.0000, 550.0000, N'2020', N'Automatic')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (9, N'Opel', N'Mokka', 220.0000, 270.0000, N'2020', N'Automatic')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (10, N'BMW', N'I320', 560.0000, 700.0000, N'2019', N'Automatic')
INSERT [dbo].[CarsType] ([CarTypeID], [Manufacturer], [Model], [DailyPrice], [DailyOverduePrice], [ManufacturerYear], [ShiftGear]) VALUES (11, N'BMW', N'I520', 650.0000, 800.0000, N'2019', N'Automatic')
SET IDENTITY_INSERT [dbo].[CarsType] OFF
SET IDENTITY_INSERT [dbo].[RentalOrders] ON 

INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (19, CAST(N'2019-10-15T21:00:00.000' AS DateTime), CAST(N'2019-10-19T21:00:00.000' AS DateTime), CAST(N'2019-10-20T00:00:00.000' AS DateTime), 26, 6, 6, N'2763846', N'Close', N'ADI-20-1-6T12-49-30')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (20, CAST(N'2020-01-22T00:00:00.000' AS DateTime), CAST(N'2020-01-28T00:00:00.000' AS DateTime), CAST(N'2020-01-28T00:00:00.000' AS DateTime), 46, 1, 1, N'1805862', N'Close', N'ADI-20-1-6T12-49-59')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (21, CAST(N'2020-02-23T22:00:00.000' AS DateTime), CAST(N'2020-02-28T22:00:00.000' AS DateTime), CAST(N'2020-02-28T00:00:00.000' AS DateTime), 5, 4, 4, N'15983582', N'Close', N'ADI-20-1-6T12-50-16')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (22, CAST(N'2020-03-08T22:00:00.000' AS DateTime), CAST(N'2020-03-12T22:00:00.000' AS DateTime), CAST(N'2020-03-12T00:00:00.000' AS DateTime), 25, 1, 1, N'1805862', N'Close', N'ADI-20-1-6T12-50-34')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (24, CAST(N'2020-04-06T21:00:00.000' AS DateTime), CAST(N'2020-04-12T21:00:00.000' AS DateTime), CAST(N'2020-04-14T00:00:00.000' AS DateTime), 5, 3, 3, N'2485904', N'Close', N'ADI-20-1-6T12-51-08')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (25, CAST(N'2020-05-13T21:00:00.000' AS DateTime), CAST(N'2020-05-19T21:00:00.000' AS DateTime), NULL, 25, 4, 4, N'15983582', N'Open', N'ADI-20-1-6T12-51-27')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (26, CAST(N'2020-01-01T22:00:00.000' AS DateTime), CAST(N'2020-01-03T22:00:00.000' AS DateTime), CAST(N'2020-01-06T19:46:59.770' AS DateTime), 54, 1, 1, N'1805862', N'Close', N'ADI-20-1-6T16-26-03')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (28, CAST(N'2020-01-04T22:00:00.000' AS DateTime), CAST(N'2020-01-07T22:00:00.000' AS DateTime), CAST(N'2020-01-07T00:00:00.000' AS DateTime), 5, 4, 4, N'15983582', N'Close', N'ADI-20-1-8T10-59-42')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (29, CAST(N'2020-01-04T22:00:00.000' AS DateTime), CAST(N'2020-01-07T22:00:00.000' AS DateTime), CAST(N'2020-01-08T09:48:24.520' AS DateTime), 25, 6, 6, N'2763846', N'Close', N'ADI-20-1-8T11-29-16')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (31, CAST(N'2020-01-14T22:00:00.000' AS DateTime), CAST(N'2020-01-16T22:00:00.000' AS DateTime), CAST(N'2020-01-16T11:23:39.490' AS DateTime), 54, 1, 1, N'1805862', N'Close', N'ADI-20-1-8T12-04-40')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (33, CAST(N'2020-01-27T00:00:00.000' AS DateTime), CAST(N'2020-01-28T00:00:00.000' AS DateTime), CAST(N'2020-01-28T00:00:00.000' AS DateTime), 46, 3, 3, N'2485904', N'Close', N'ADI-20-1-8T12-41-09')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (36, CAST(N'2020-06-04T00:00:00.000' AS DateTime), CAST(N'2020-06-09T00:00:00.000' AS DateTime), NULL, 26, 8, 8, N'23986356', N'Open', N'ADI-20-1-23T16-11-20')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (43, CAST(N'2020-01-25T00:00:00.000' AS DateTime), CAST(N'2020-01-27T00:00:00.000' AS DateTime), CAST(N'2020-01-27T00:00:00.000' AS DateTime), 41, 4, 4, N'15983582', N'Close', N'ADI-20-1-25T13-32-26')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (45, CAST(N'2020-07-29T00:00:00.000' AS DateTime), CAST(N'2020-07-31T00:00:00.000' AS DateTime), NULL, 25, 8, 8, N'23986356', N'Open', N'ADI-20-1-28T13-55-36')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (47, CAST(N'2020-08-17T00:00:00.000' AS DateTime), CAST(N'2020-08-22T00:00:00.000' AS DateTime), NULL, 26, 2, 2, N'1743986', N'Open', N'ADI-20-1-28T13-56-47')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (48, CAST(N'2020-09-23T00:00:00.000' AS DateTime), CAST(N'2020-09-26T00:00:00.000' AS DateTime), NULL, 54, 6, 6, N'2763846', N'Open', N'ADI-20-1-28T13-57-00')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (49, CAST(N'2020-03-27T00:00:00.000' AS DateTime), CAST(N'2020-03-28T00:00:00.000' AS DateTime), CAST(N'2020-04-21T00:00:00.000' AS DateTime), 5, 8, 8, N'23986356', N'Close', N'ADI-20-3-21T12-53-29')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (50, CAST(N'2020-04-23T00:00:00.000' AS DateTime), CAST(N'2020-04-26T00:00:00.000' AS DateTime), NULL, 41, 8, 8, N'23986356', N'Open', N'ADI-20-4-20T21-43-28')
INSERT [dbo].[RentalOrders] ([OrderID], [StartDate], [EndDate], [ActualEndDate], [UserID], [CarTypeID], [CarID], [PlateNumber], [OrderStatus], [OrderNumber]) VALUES (51, CAST(N'2020-05-27T00:00:00.000' AS DateTime), CAST(N'2020-05-30T00:00:00.000' AS DateTime), NULL, 26, 8, 8, N'23986356', N'Open', N'ADI-20-4-21T17-41-33')
SET IDENTITY_INSERT [dbo].[RentalOrders] OFF
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (5, N'035648765', N'Luba', N'Epshtein', N'LuEpshtein', CAST(N'1989-03-21T22:00:00.000' AS DateTime), N'Female', N'lu.epshtein@gmail.com', N'68D977BE407A8B76F66F38F7FFF9E6D7', N'Customer', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (25, N'037652945', N'Guy', N'Ron', N'Guy123', NULL, N'Male', N'guy_ron@gmail.com', N'7D570B3C22B961E0280F32EFA782F1D5', N'Customer', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (26, N'028725435', N'Ariel', N'Adi', N'Ariel123', CAST(N'1970-07-15T22:00:00.000' AS DateTime), N'Female', N'Ariel.Adi@gmail.com', N'4B6F47D97E6FEEAB0BF7F2BC016DFC67', N'Customer', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (41, N'040687636', N'Or', N'Israeli', N'OrIsra', NULL, N'Male', N'Or.Israel@adi_rent.com', N'A9A2A9A4950534197B4F666C1BC50E28', N'Employee', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (46, N'047398352', N'Dana', N'Din', N'Danad', CAST(N'1989-08-08T21:00:00.000' AS DateTime), N'Female', N'Dana.dim@walla.com', N'0CF0012DA511F9658AA7DE4CEA80C054', N'Customer', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (47, N'048629477', N'Moshe', N'Cohen', N'Mosheco', CAST(N'1974-05-06T22:00:00.000' AS DateTime), N'Male', N'Moshe.Cohen@adi_rent.com', N'1A5B685C8AA5D0458E4D937916281758', N'Employee', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (48, N'032492376', N'Omri', N'Adi', N'Admin', CAST(N'1986-05-28T21:00:00.000' AS DateTime), N'Male', N'Omri.Adi@adi_rent.com', N'88CADD99B12C87A294FC74BB9288A1E2', N'Admin', N'd6f094e6-dc27-4b04-ab46-313d22648d19.jpg')
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (52, N'038113287', N'Moran', N'Adi', N'Admin2', CAST(N'1986-05-15T00:00:00.000' AS DateTime), N'Female', N'Moran.Adi@adi_rent.com', N'21EED4F2E9AB214FDBF00A2A091D63C4', N'Admin', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (54, N'037468939', N'Dolev', N'Honen', N'Dolevho', CAST(N'1991-10-09T00:00:00.000' AS DateTime), N'Male', N'dolev.honen@gmail.com', N'8AAC8D79DD699C5E4D825F259828E4FE', N'Customer', NULL)
INSERT [dbo].[Users] ([UserID], [IDNumber], [FirstName], [LastName], [UserName], [Birthdate], [Gender], [Email], [Password], [Role], [Photo]) VALUES (55, N'040868763', N'Yaniv', N'Dor', N'YanivDor', CAST(N'1980-10-21T00:00:00.000' AS DateTime), N'Male', N'Yaniv.Dor@adi_rent.com', N'6D80412F80213FE7525A7CCBDC8314A3', N'Employee', NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
ALTER TABLE [dbo].[Cars] ADD  CONSTRAINT [DF_Cars_Rentable]  DEFAULT ((0)) FOR [Rentable]
GO
ALTER TABLE [dbo].[Cars]  WITH CHECK ADD  CONSTRAINT [FK_Cars_CarsType] FOREIGN KEY([CarTypeID])
REFERENCES [dbo].[CarsType] ([CarTypeID])
GO
ALTER TABLE [dbo].[Cars] CHECK CONSTRAINT [FK_Cars_CarsType]
GO
ALTER TABLE [dbo].[RentalOrders]  WITH CHECK ADD  CONSTRAINT [FK_RentalOrders_Cars] FOREIGN KEY([CarID])
REFERENCES [dbo].[Cars] ([CarID])
GO
ALTER TABLE [dbo].[RentalOrders] CHECK CONSTRAINT [FK_RentalOrders_Cars]
GO
ALTER TABLE [dbo].[RentalOrders]  WITH CHECK ADD  CONSTRAINT [FK_RentalOrders_CarsType] FOREIGN KEY([CarTypeID])
REFERENCES [dbo].[CarsType] ([CarTypeID])
GO
ALTER TABLE [dbo].[RentalOrders] CHECK CONSTRAINT [FK_RentalOrders_CarsType]
GO
ALTER TABLE [dbo].[RentalOrders]  WITH CHECK ADD  CONSTRAINT [FK_RentalOrders_Users] FOREIGN KEY([UserID])
REFERENCES [dbo].[Users] ([UserID])
GO
ALTER TABLE [dbo].[RentalOrders] CHECK CONSTRAINT [FK_RentalOrders_Users]
GO
/****** Object:  StoredProcedure [dbo].[GetAvailableCarsByDates]    Script Date: 21/04/2020 17:51:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[GetAvailableCarsByDates](@startDate date, @endDate date) as
select CT.CarTypeID, CarID, ManufacturerYear, DailyPrice, DailyOverduePrice, Model, Manufacturer,
ShiftGear, B.BranchID, CarType, CurrentMileage, Photo, BranchName, Rentable, CarPlateNumber
from CarsType as CT join Cars as C on CT.CarTypeID = C.CarTypeID join Branches as B on B.BranchID = C.BranchID
where Rentable = 1 
and CarID not in (select CarID from RentalOrders where (StartDate <= @startDate and EndDate >= @startDate) or (StartDate <= @endDate and EndDate >= @endDate) or (StartDate >= @startDate and EndDate <= @endDate))
GO
USE [master]
GO
ALTER DATABASE [AdiRent] SET  READ_WRITE 
GO
