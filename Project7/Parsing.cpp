#include "Parsing.hpp"

Parsing::Parsing()
{
}

Parsing::~Parsing()
{
}

Parsing::Parsing(std::string file_path)
{
    ParsingTextFile(file_path);
}

void Parsing::WriteDataOnCSVFile()
{
    std::string file_path = m_file_path_name + ".csv";

    std::ofstream file(file_path.c_str());

    file << "Message" << "," << "Count" << std::endl;
    
    std::multimap<int, std::string> aa;
    for (auto& it : data)
    {
        aa.emplace(std::pair<int, std::string>(it.second, it.first));
    }

    for (auto& it: aa)
    {
        file << it.second << "," << it.first << std::endl;
    }

    file.close();
}

void Parsing::ParsingTextFile(std::string file_path)
{
    m_file_path_name = file_path.substr(0, file_path.find(".txt"));

    std::ifstream file;
    file.open(file_path.c_str());
    if (!file.is_open())
    {
        std::cout << "Error: file cannot open - " << file_path << std::endl;
    }
    
    std::string line;
    std::string delim_message = "message=\"";
    std::string delim_end = "\"";
    std::string delim_magic_number = "magic number";
    std::string delim_line_is_longer = "Line is longer than 80 characters";

    std::string delim_column_number = "at column";
    std::string delim_file_new_line = "File does not end with a newline";
    std::string delim_parameter = "Parameter";
    std::string delim_class_extension = "looks like designed for extension";

    std::string delim_javadoc = "Javadoc";
    std::string delim_package_java = "package-info.java";

    std::string delim_private = "must be private and have";
    std::string variable_private = "Visibility Modifier";

    std::string delim_import = "import should be avoided";
    std::string using_import = "Avoid Star Import";

    std::string delim_unused_import = "Unused import";

    std::string delim_name_match = "must match pattern";
    std::string name_must_match = "Type Name";

    std::string delim_followed_by_whitespace = "is not followed by whitespace";
    std::string followed_by_whitespace = "Whitespace Around + Whitespace After";

    std::string delim_preceded_with_whitespace = "is not preceded with whitespace";
    std::string preceded_with_whitespace = "Whitespace Around";

    std::string delim_hides = "hides a field";
    std::string hides_field = "Hides a field";

    std::string delim_multi_block = "multi-block statement";
    std::string multi_block = "Should be on the same line as the next part of a multi-block statement";

    std::string delim_multiple_valiable_declation = "Each variable declaration must be in its own ";


    std::string token;
    
    while (!file.eof())
    {
        std::getline(file, line);
        if (line.find(delim_message) == std::string::npos)
        {
            continue;
        }

        token = line.substr(line.find(delim_message) + delim_message.size(), line.size()-1);
        token = token.substr(0, token.find(delim_end));

        if (token.find(delim_magic_number) != std::string::npos)
        {
            token = "Magic Number";
        }
        else if (token.find(delim_multiple_valiable_declation) != std::string::npos)
        {
            token = "Multiple Variable Declarations";
        }
        else if (token.find(delim_column_number) != std::string::npos)
        {
            token = "Left Curly + Right Curly";
        }
        else if (token.find(delim_file_new_line) != std::string::npos)
        {
            token = "Newline At End OfFile";
        }
        else if (token.find("Inner assignments should be avoided") != std::string::npos)
        {
            token = "Inner Assignment";
        }
        else if (token.find(delim_line_is_longer) != std::string::npos)
        {
            token = "Line Length";
        }
        else if (token.find(delim_parameter) != std::string::npos)
        {
            token = "Final Parameters";
        }
        else if (token.find(delim_class_extension) != std::string::npos)
        {
            continue;
        }
        else if (token.find(delim_javadoc) != std::string::npos)
        {
            continue;
        }
        else if (token.find(delim_package_java) != std::string::npos)
        {
            continue;
        }
        else if (token.find(delim_private) != std::string::npos)
        {
            token = variable_private;
        }
        else if (token.find(delim_import) != std::string::npos)
        {
            token = using_import;
        }
        else if (token.find(delim_unused_import) != std::string::npos)
        {
            token = delim_unused_import;
        }
        else if (token.find(delim_name_match) != std::string::npos)
        {
            token = name_must_match;
        }
        else if (token.find(delim_followed_by_whitespace) != std::string::npos)
        {
            token = followed_by_whitespace;
        }
        else if (token.find(delim_preceded_with_whitespace) != std::string::npos)
        {
            token = preceded_with_whitespace;
        }
        else if (token.find(delim_hides) != std::string::npos)
        {
            token = hides_field;
        }
        else if (token.find(delim_multi_block) != std::string::npos)
        {
            token = multi_block;
        }


        if (data.find(token) != data.end())
        {
            data.at(token)++;
        }
        else
        {
            data.emplace(token, 1);
        }
    }

    file.close();

}