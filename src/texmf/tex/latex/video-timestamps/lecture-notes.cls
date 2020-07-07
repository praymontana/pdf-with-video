\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{lecture-notes}[2019/07/04 LaTeX class for lecture notes]
\LoadClass[a4paper,12pt]{article}

\newif\if@russian

\DeclareOption{russian}{\@russiantrue}

\ProcessOptions\relax

\if@russian
\RequirePackage[T2A]{fontenc}
\RequirePackage[utf8]{inputenc}
\RequirePackage[russian]{babel}

% добавить точку после номера теоремы. LaTeX в примерах http://www.ccas.ru/voron/download/voron05latex.pdf
\renewcommand{\@begintheorem}[2]{\par{\bf #1\ #2.\ }\samepage\begingroup\sl}
\renewcommand{\@opargbegintheorem}[3]{\par{\bf #1\ #2\ (#3).\ }\samepage\begingroup\sl}
\renewcommand{\@endtheorem}{\endgroup}
\fi

\RequirePackage{amsthm}
\RequirePackage{etoolbox}
\RequirePackage{float}

\def\@title{Укажите заголовок с помощью команды \texttt{\textbackslash title}}
\def\@subtitle{}
\def\@lecturer{Лектор не указан}
\def\@notesauthor{Автор конспекта не указан}
\def\@date{}

\def\subtitle#1{\def\@subtitle{#1}}
\def\lecturer#1{\def\@lecturer{#1}}
\def\notesauthor#1{\def\@notesauthor{#1}}

\def\and{%
\end{tabular}\hskip 1em\begin{tabular}[t]{c}
}

\def\@maketitle{%
\newpage\null\vskip 2em%
\begin{center}%
\let\footnote\thanks%
{\LARGE \@title \par }
\ifdefempty{\@subtitle}{}{
\vskip 1em
{\large \@subtitle \par }
}
\vskip 1.5em
{\large \lineskip .5em
\begin {tabular}[t]{c}
\@lecturer
\end{tabular}\par
}
\end{center}%
{\large \lineskip .5em
запись конспекта:\hskip 1em
\begin{tabular}[t]{c}
\@notesauthor
\end{tabular}\par
}
\ifdefempty{\@date}{}{
    {\large \lineskip .5em
    дата лекции:
    \begin{tabular}[t]{c}
    \hskip 1em \@date
    \end{tabular}\par
    }
}
\par\vskip 1.5em
}

\renewcommand{\[}{\begin{equation}}
\renewcommand{\]}{\end{equation}}

\theoremstyle{definition}
\newtheorem*{definition}{Определение}
\newtheorem{definition*}{Определение}
\newtheorem*{problem}{Задача}
\newtheorem{problem*}{Задача}
\newtheorem*{example}{Пример}
\newtheorem{example*}{Пример}

\theoremstyle{plain}
\newtheorem*{theorem}{Теорема}
\newtheorem{theorem*}{Теорема}
\newtheorem*{lemma}{Лемма}
\newtheorem{lemma*}{Лемма}
\newtheorem*{corollary}{Следствие}
\newtheorem{corollary*}{Следствие}
\newtheorem*{proposition}{Утверждение}
\newtheorem{proposition*}{Утверждение}
\newtheorem*{conjecture}{Гипотеза}
\newtheorem{conjecture*}{Гипотеза}

\theoremstyle{remark}
\newtheorem*{remark}{Замечание}
\newtheorem{remark*}{Замечание}
\newtheorem*{note}{Примечание}
\newtheorem{note*}{Примечание}
