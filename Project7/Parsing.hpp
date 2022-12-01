#pragma once
#include <iostream>
#include <fstream>
#include <string>
#include <map>

class Parsing
{
public:
    Parsing();
    ~Parsing();
    Parsing(std::string file_path);
    
    void WriteDataOnCSVFile();

private:
    void ParsingTextFile(std::string file_path);
    
private:
    std::string m_file_path_name;

    std::map<std::string, int> data;

};