CREATE TABLE Users (
    UserID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(100) NOT NULL,
    Email NVARCHAR(150) NOT NULL UNIQUE,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
);

CREATE TABLE Categories (
    CategoryID INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName NVARCHAR(100) NOT NULL UNIQUE,
    Description NVARCHAR(255)
);

CREATE TABLE Tasks (
    TaskID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(1000),
    Status NVARCHAR(30) NOT NULL DEFAULT 'Pending',
    Priority NVARCHAR(20) NOT NULL DEFAULT 'Medium',
    DueDate DATE,
    UserID INT NOT NULL,
    CategoryID INT NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),

    CONSTRAINT FK_Tasks_Users
        FOREIGN KEY (UserID)
        REFERENCES Users(UserID),

    CONSTRAINT FK_Tasks_Categories
        FOREIGN KEY (CategoryID)
        REFERENCES Categories(CategoryID),

    CONSTRAINT CK_Tasks_Status
        CHECK (Status IN ('Pending', 'In Progress', 'Completed')),

    CONSTRAINT CK_Tasks_Priority
        CHECK (Priority IN ('Low', 'Medium', 'High'))
);