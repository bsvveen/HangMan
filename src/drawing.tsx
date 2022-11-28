// https://www.rapidtables.com/code/text/unicode-characters.html
import React, { useEffect, useState } from 'react';

export default function Drawing({MaxIndex = 0, Drawing = []}) {

    const NoRows = 5;
    const NoCols = 5;         

    const createTable = () => {
        let rows = [];
        for (let i = 0; i < NoRows; i++) {            
            let cell = [];
            for (let j = 0; j < NoCols; j++) {     
                let cellContentIndex = Drawing.findIndex(e => e.row == i && e.col == j);                                 
                cell.push(<td key={'cell'+ i + ',' + j} style={{padding: 0}}>{
                    (cellContentIndex<MaxIndex)?Drawing[cellContentIndex]?.char:""
                }</td>);
            }
            rows.push(<tr key={'row' + i}>{cell}</tr>)
        };   
        return rows;
      }

    return (
        <table id="simple-board" style={{}}>
            <tbody>
                {createTable()}
            </tbody>
        </table>
    );
}